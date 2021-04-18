const createError = require('http-errors');
const User = require('../models/user.model');
const Follow = require('../models/follow.model');

module.exports.followUser = async (req, res, next) => {
  const { username } = req.params;

  if (username === req.user.username) return next(createError(400, 'You cannot follow yourself'));

  const userToFollow = await User.findOne({ username });
  if (!userToFollow) return next(createError(404, 'User not found'));

  const alreadyFollowing = await Follow.findOne({
    user: req.user.id,
    following: userToFollow.id
  });
  if (alreadyFollowing) return next(createError(400, 'You are already following this user'));
  else {
    await Follow.create({
      user: req.user.id,
      following: userToFollow.id
    });
  }
  res.status(200).json({ message: `You are now following @${username}` });
}

module.exports.unfollowUser = async (req, res, next) => {
  const { username } = req.params;

  if (username === req.user.username) return next(createError(400, 'You cannot unfollow yourself'));

  const userToFollow = await User.findOne({ username });
  if (!userToFollow) return next(createError(404, 'User not found'));

  const alreadyFollowing = await Follow.findOne({
    user: req.user.id,
    following: userToFollow.id
  });
  if (!alreadyFollowing) return next(createError(400, 'You do not follow this user'));
  else {
    await Follow.findOneAndDelete({
      user: req.user.id,
      following: userToFollow.id
    });
  }
  res.status(200).json({ message: `You unfollowed @${username}` })
}

module.exports.listFollowers = async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({ username })
    .populate({
      path: 'followers',
      select: 'user -following',
      populate: {
        path: 'user',
        select: 'avatar fullName username'
      }
    }).select("username followers");

  if (!user) return next(createError(400, 'User not found'));

  const newUser = user.toObject();

  let currentUser;

  if (req.user) {
    currentUser = await User.findById(req.user.id)
      .populate({
        path: 'following',
        select: 'following -user',
        populate: {
          path: 'following',
          select: 'username fullName avatar'
        }
      }).select('username followers');

    newUser.followers = newUser.followers.map(follower => {
      return {
        ...follower,
        amIFollowing: currentUser.following.some(userIAmFollowing => userIAmFollowing.following.id == follower.user.id)
      }
    })
  }

  res.status(200).json(newUser.followers);

}

module.exports.listFollowing = async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({ username })
    .populate({
      path: 'following',
      select: 'following -user',
      populate: {
        path: 'following',
        select: 'username fullName avatar'
      }
    }).select('username followers');

  if (!user) return next(createError(400, 'User not found'));

  const newUser = user.toObject();

  let currentUser;

  if (req.user) {
    currentUser = await User.findById(req.user.id)
      .populate({
        path: 'following',
        select: 'following -user',
        populate: {
          path: 'following',
          select: 'username fullName avatar'
        }
      }).select('username followers');

    newUser.following = newUser.following.map(following => {
      return {
        ...following,
        amIFollowing: currentUser.following.some(userIAmFollowing => userIAmFollowing.following.id == following.following.id)
      }
    })

  }

  res.status(200).json(newUser.following);
}