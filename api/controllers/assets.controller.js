const createError = require('http-errors');
const Asset = require('../models/asset.model');
const User = require('../models/user.model');

module.exports.get = (req, res, next) => {
    Asset.findById(req.params.id)
        .then(asset => {
            if (asset) User.findById(asset.owner).then(user => res.status(200).json({asset, user}))
            else next(createError(404, 'Asset not found.'))
        })
        .catch(next)
}

module.exports.create = (req, res, next) => {
    req.body.owner = req.user.id;
    Asset.create(req.body)
        .then(asset => res.status(201).json(asset))
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    Asset.findById(req.params.id)
        .then(asset => {
            if (!asset) next(createError(404, 'Asset not found.'));
            else if (asset.owner != req.user.id) next(createError(403, 'Only the owner can perform this action.'));
            else return asset.delete().then(() => res.status(204).end())
        }).catch(next)  
}