const createError = require('http-errors');
const User = require('../models/user.model');
const Following = require('../models/following.model');
const Follower = require('../models/follower.model');

module.exports.followUser = async (req, res, next) => {
    const { username } = req.params;
    const user = req.user;

    try {
        if (username === user.username) next(createError(400, 'You cannot follow yourself'));
        else {
            const userToFollow = await User.findOne({ username });
            if (!userToFollow) next(createError(404, 'User not found'));

            const followerUpdate = await Follower.updateOne(
                { user: userToFollow.id, 'followers.user': { $ne: user.id } },
                { $push: { followers: { user: user.id } } }
            );
            const followingUpdate = await Following.updateOne(
                { user: user.id, 'following.user': { $ne: userToFollow.id } },
                { $push: { following: { user: userToFollow.id } } }
            )
            if (!followerUpdate.nModified || !followingUpdate.nModified) {
                next(createError(400, 'You are already following this user'))
            }

            res.status(200).json({ 
                status: 'success', 
                message: `Now you are following @${username}` 
            })
        }
    } catch {
        next(error);
    }
}

module.exports.unfollowUser = async (req, res, next) => {
    const { username } = req.params;
    const user = req.user;

    try {
        if (username === user.username) next(createError(400, 'You cannot unfollow yourself'));
        const userToUnfollow = await User.findOne({ username });
        if (!userToUnfollow) next(createError(404, 'User not found'));

        const followingUpdate = await Following.updateOne(
            { user: user.id }, { $pull: { following: { user: userToUnfollow.id } } }
        )
        const followerUpdate = await Follower.updateOne(
            { user: userToUnfollow.id }, { $pull: { followers: { user: user.id } } }
        )

        if (!followingUpdate.nModified || !followerUpdate.nModified) {
            next(createError(400, 'You are not following this user'))
        } else {
            res.status(200).json({ message: `@${username} unfollowed` })
        }
    }
    catch {
        next(error);
    }
}

module.exports.listFollowers = async (req, res, next) => {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) next(createError(404, 'User not found'));

    const followers = await Follower.findOne({ user }).populate({
        path: "followers",
        select: "user",
        populate: {
            path: "user",
            select: "username avatar fullName",
        },
    })
    res.status(200).json(followers.followers);
}

module.exports.listFollowing = async (req, res, next) => {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) next(createError(404, 'User not found'));

    const following = await Following.findOne({ user }).populate({
        path: "following",
        select: "user",
        populate: {
            path: "user",
            select: "username avatar fullName",
        },
    })
    res.status(200).json(following.following);
}