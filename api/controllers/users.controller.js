const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');
const Asset = require('../models/asset.model');
const Following = require('../models/following.model');
const Follower = require('../models/follower.model');

module.exports.create = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                next(createError(400, { errors: { email: 'This email already exists' } }))
            } else {
                return User.create(req.body)
                    .then(user => res.status(201).json(user))
            }
        })
        .catch(next)
}

module.exports.get = async (req, res, next) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }, 'username fullName id avatar bio website');
        if (!user) next(createError(404, 'User not found'))

        const assets = await Asset.find({ owner: user.id })

        return res.status(200).json({ user, assets })
    } catch (error) {
        next(error);
    }
}

module.exports.profile = async (req, res, next) => {
    const { username } = req.user;
    try {
        const user = await User.findOne({ username });
        if (!user) next(createError(404, 'User not found'))

        const assets = await Asset.find({ owner: user.id })

        const followers = await Follower.findOne({ user: user.id });
        const following = await Following.findOne({ user: user.id });

        return res.status(200).json({
            user,
            followers: followers.followers.length,
            following: following.following.length,
            assets
        });

    } catch (error) {
        next(error);
    }
}

module.exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).end())
        .catch(next)
}

module.exports.update = (req, res, next) => {
    const { id } = req.params;

    User.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.status(202).json(user))
        .catch(next)
}

module.exports.totp = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next(createError(401, 'Not authenticated'))
    }

    if (totp(req.user.totpSecret) === req.body.totp) {
        req.session.secondFactor = true
        return res.json(req.user)
    }

    next(createError(400, 'invalid TOTP'))
}

module.exports.logout = (req, res, next) => {
    req.logout();

    res.status(204).end()
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, validations) => {
        if (error) {
            next(error);
        } else if (!user) {
            next(createError(400, { errors: validations }))
        } else {
            req.login(user, error => {
                if (error) next(error)
                else res.json(user)
            })
        }
    })(req, res, next);
};

module.exports.followUser = async (req, res, next) => {
    const { username } = req.params;
    const user = req.user;

    try {
        if (username === user.username) next(createError(400, 'You cannot follow yourself'));
        else {
            const userToFollow = await User.findOne({ username });
            if (!userToFollow) next(createError(400, 'Could not find that user'));

            const followerUpdate = await Follower.updateOne(
                { user: userToFollow.id, 'followers.user': { $ne: user.id } },
                { $push: { followers: { user: user.id } } }
            );
            const followingUpdate = await Following.updateOne(
                { user: user.id, 'following.user': { $ne: userToFollow.id } },
                { $push: { following: { user: userToFollow.id } } }
            )
            if (!followerUpdate.nModified || !followingUpdate.nModified) {
                next(createError(400, 'You are already following this user'))
            }

            res.status(200).json({ message: `Now you are following ${username}` })
        }
    } catch {
        next(error);
    }
}

module.exports.unfollowUser = async (req, res, next) => {
    const { username } = req.params;
    const user = req.user;

    try {
        if (username === user.username) next(createError(400, 'You cannot unfollow yourself'));
        const userToUnfollow = await User.findOne({ username });
        if (!userToUnfollow) next(createError(400, 'Could not find that user'));

        const followingUpdate = await Following.updateOne(
            { user: user.id }, { $pull: { following: { user: userToUnfollow.id } } }
        )
        const followerUpdate = await Follower.updateOne(
            { user: userToUnfollow.id }, { $pull: { followers: { user: user.id } } }
        )

        if (!followingUpdate.nModified || !followerUpdate.nModified) {
            next(createError(400, 'You are not following this user'))
        } else {
            res.status(200).json({ message: `${username} unfollowed` })
        }
    }
    catch {
        next(error);
    }


}