const createError = require('http-errors');
const Asset = require('../models/asset.model')
const Comment = require('../models/comment.model')


module.exports.create = async (req, res, next) => {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return next(createError(404, 'Asset not found'));

    const comment = await Comment.create({
        user: req.user.id,
        asset: req.params.id,
        body: req.body.comment
    })

    res.status(201).json(comment);
}

module.exports.delete = async (req, res, next) => {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return next(createError(404, 'Asset not found'));

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return next(createError(404, 'Comment not found'));

    await Comment.findByIdAndDelete(comment.id);
    res.status(200).json({
        message: 'success'
    })
}

module.exports.list = async (req, res, next) => {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return next(createError(404, 'Asset not found'));

    const comments = await Comment.find({ asset: req.params.id }, 'user body')
        .populate({
            path: 'user',
            select: 'username fullName avatar'
        })

    res.status(200).json({ comments })
}