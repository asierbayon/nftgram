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

module.exports.search = async (req, res, next) => {
    if (!req.body.search) next(createError(400, 'Please provide a search value'))

    const regex = `^${req.body.search}`;
    const searchQuery = new RegExp(regex, "i");

    const users = await User.find({
        $or: [
            {
                username: searchQuery,
            },
            {
                fullName: searchQuery,
            },
        ],
    })
        .limit(8)
        .skip(0)
        .select("username fullName avatar");

    if (!users) next(createError(404, 'No users found'))

    res.status(200).json({
        results: users.length,
        users
    });
};