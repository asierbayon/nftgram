const createError = require('http-errors');
const Asset = require('../models/asset.model');
const User = require('../models/user.model');
const Like = require('../models/like.model');

module.exports.get = async (req, res, next) => {
    const asset = await Asset.findById(req.params.id)
        .populate('likes')
        .populate('comments')
        
    if (!asset) next(createError(404, 'Asset not found.'));

    const user = await User.findById(asset.owner, 'fullName username avatar')
    if (!user) next(createError(404, 'The user has removed its profile'))

    let like = null;
    if (req.user) {
        like = await Like.findOne({
            asset: asset.id,
            likedBy: req.user.id
        });
    }
    const newAsset = asset.toObject();
    like ? newAsset.likedByMe = true : newAsset.likedByMe = false;

    res.status(200).json({ asset: newAsset, user });
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