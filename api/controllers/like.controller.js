const Like = require('../models/like.model');
const Asset = require('../models/asset.model');
const createError = require('http-errors');


module.exports.likePost = async (req, res, next) => {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return next(createError(404, 'This post does not exist'));

    const alreadyLiked = await Like.findOne({
        likedBy: req.user.id,
        asset: req.params.id
    })

    if (alreadyLiked) return next(createError(400, 'You already liked this post'));
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
    if (!asset) return next(createError(404, 'This post does not exist'));

    const alreadyLiked = await Like.findOne({
        likedBy: req.user.id,
        asset: req.params.id
    })

    if (!alreadyLiked) return next(createError(400, 'You have not liked this post yet'));
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

module.exports.listLikes = async (req, res, next) => {
    const likes = await Like.find({ asset: req.params.id })
        .populate({
            path: 'likedBy',
            select: 'username fullName avatar'
        }).select('username fullName avatar')

    res.status(200).json({
        likes: likes.length,
        likedBy: likes
    })
}