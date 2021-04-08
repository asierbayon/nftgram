const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');
const Asset = require('../models/asset.model');

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
        const user = await User.findOne({ username });
        if (!user) next(createError(404, 'User not found.'))

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
        if (!user) next(createError(404, 'User not found.'))

        const assets = await Asset.find({ owner: user.id })

        return res.status(200).json({ user, assets })
    } catch (error) {
        next(error);
    }
}

module.exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.status(204).end())
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
        return next(createError(401, 'user is not authenticated'))
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
