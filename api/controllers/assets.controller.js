const createError = require('http-errors');
const Asset = require('../models/asset.model');

module.exports.list = (req, res, next) => {
    Asset.find({})
        .then(assets => res.json(assets))
        .catch(next)
}

module.exports.create = (req, res, next) => {
    Asset.create(req.body)
        .then(asset => res.status(201).json(asset))
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    Asset.findById(req.params.id)
        .then(asset => {
            if (!asset) next(createError(404, 'Asset not found.'));
            else if (asset.owner != req.user.id) next(createError(403, 'Only the owner can perform this action.'));
            else return asset.delete();
        }).catch(next)
}