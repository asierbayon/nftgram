const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');
const Asset = require('../models/asset.model');
const Comment = require('../models/comment.model');
const Follow = require('../models/follow.model');
const Like = require('../models/like.model');

module.exports.create = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return next(createError(400, { errors: { email: 'This email already exists' } }))
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
        const user = await User.findOne({ username }, 'username fullName id avatar bio website')
            .populate('followingCount')
            .populate('followersCount')
        if (!user) return next(createError(404, 'User not found'));

        const assets = await Asset.find({ owner: user.id }, 'image');

        return res.status(200).json({
            user,
            assets
        });

    } catch (error) {
        next(error);
    }
}

module.exports.profile = async (req, res, next) => {
    const { username } = req.user;
    const user = await User.findOne({ username })
        .populate('followingCount')
        .populate('followersCount')
    if (!user) return next(createError(404, 'User not found'))

    const assets = await Asset.find({ owner: user.id }, 'image')


    return res.status(200).json({
        user,
        assets
    });
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

module.exports.logout = (req, res, next) => {
    req.logout();

    res.status(204).end()
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, validations) => {
        if (error) {
            next(error);
        } else if (!user) {
            return next(createError(400, { errors: validations }))
        } else {
            req.login(user, error => {
                if (error) next(error)
                else res.json(user)
            })
        }
    })(req, res, next);
};

module.exports.search = async (req, res, next) => {
    if (!req.body.search) return next(createError(400, 'Please provide a search value'))

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

    if (!users) return next(createError(404, 'No users found'))

    res.status(200).json({
        results: users.length,
        users
    });
};

module.exports.delete = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, 'User not found'))
    else if (req.params.id !== req.user.id) return next(createError(400, 'Only the owner can perform this action'))
    else {
        await User.findByIdAndDelete(req.params.id)
        await Asset.deleteMany({ owner: req.params.id })
        await Comment.deleteMany({ user: req.params.id })
        await Like.deleteMany({ user: req.params.id })
        await Follow.deleteMany({ user: req.params.id })
    }

    res.status(204).json({ message: 'Your account has been removed' })
}