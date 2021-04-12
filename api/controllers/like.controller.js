const createError = require("http-errors");
const Like = require('../models/like.model');


module.exports.likePost = async (req, res, next) => {
    const post = await post.findById(req.params.postId);
    if (!post) next(createError(404, 'This post does not exist'));

    await Like.create({
        likedBy: req.user.id,
        post: req.params.postId
    })
}