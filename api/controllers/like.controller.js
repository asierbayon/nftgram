const createError = require("http-errors");
const Like = require('../models/like.model');
const Asset = require('../models/asset.model');


module.exports.likePost = async (req, res, next) => {
    const asset = await Asset.findById(req.params.id);
    if (!asset) next(createError(404, 'This post does not exist'));

    const alreadyLiked = await Like.findOne({
        likedBy: req.user.id,
        asset: req.params.id
    })

    if (alreadyLiked) next(createError(400, 'You already liked this post'));
    else {
        await Like.create({
            likedBy: req.user.id,
            asset: req.params.id
        })

        res.status(200).json({
            status: 'success',
            message: 'You have liked this post'
        })
    }
}

module.exports.unlikePost = async (req, res, next) => {
    const asset = await Asset.findById(req.params.id);
    if (!asset) next(createError(404, 'This post does not exist'));

    const alreadyLiked = await Like.findOne({
        likedBy: req.user.id,
        asset: req.params.id
    })

    if (!alreadyLiked) next(createError(400, 'You have not liked this post yet'));
    else {
        await Like.findOneAndDelete({
            likedBy: req.user.id,
            asset: req.params.id
        });
        res.status(200).json({
            status: 'success',
            message: 'You have unliked this post'
        })
    }
}