const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');
const Asset = require('../models/asset.model');
const Comment = require('../models/comment.model');
const Follow = require('../models/follow.model');
const Like = require('../models/like.model');


module.exports.create = (req, res, next) => {
  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  })
    .then(user => {
      if (user) {
        if (req.body.email === user.email) {
          return next(createError(400, { errors: { email: 'This email already exists' } }))
        } else {
          return next(createError(400, { errors: { username: 'This username already exists' } }))
        }
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
    const user = await User.findOne({ username }, 'username fullName id avatar bio website ethAddress')
      .populate('followingCount')
      .populate('followersCount')
    if (!user) return next(createError(404, 'User not found'));

    const assets = await Asset.find({ owner: user.id }, 'image');

    let isFollowing = false;

    if (req.user) {
      const isFollower = await Follow.findOne({ user: req.user.id, following: user.id })
      if (isFollower) isFollowing = true;
    }

    return res.status(200).json({
      user,
      assets,
      isFollowing
    });

  } catch (error) {
    next(error);
  }
}

module.exports.profile = async (req, res, next) => {
  const { username } = req.user;
  const user = await User.findOne({ username })
    .populate('followingCount')
    .populate('followersCount')
  if (!user) return next(createError(404, 'User not found'))

  const assets = await Asset.find({ owner: user.id }, 'image')

  return res.status(200).json({
    user,
    assets
  });
}

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const { password, passwordMatch, username, fullName, bio, website, ethAddress } = req.body;

  if (req.fileValidationError) return next(createError(400, req.fileValidationError));

  if (password && password !== passwordMatch) {
    return next(createError(400, 'Passwords do not match'))
  } else {
    const updateFields = { username, fullName, bio, website, ethAddress };
    if (req.file) {
      updateFields.avatar = req.file.path;
    }
    if (password) {
      updateFields.password = password;
    }
    Object.assign(req.user, updateFields);
    User.findByIdAndUpdate(req.user.id, req.user, { runValidators: true, new: true })
      .then(user => res.status(202).json(user))
      .catch(next)
  }
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
      return next(createError(400, { errors: validations }))
    } else {
      req.login(user, error => {
        if (error) next(error)
        else res.json(user)
      })
    }
  })(req, res, next);
};

module.exports.search = async (req, res, next) => {
  const { search } = req.query;
  if (!search) return next(createError(400, 'Please provide a search value'))

  const regex = `^${search}`;
  const searchQuery = new RegExp(regex, "i");

  const users = await User.find({
    $or: [
      {
        username: searchQuery,
      },
      {
        fullName: searchQuery,
      },
    ],
  })
    .limit(8)
    .skip(0)
    .select("username fullName avatar");

  if (!users) return next(createError(404, 'No users found'))

  res.status(200).json({
    results: users.length,
    users
  });
};

module.exports.delete = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(createError(404, 'User not found'))
  else if (req.params.id !== req.user.id) return next(createError(400, 'Only the owner can perform this action'))
  else {
    await User.findByIdAndDelete(req.params.id)
    await Asset.deleteMany({ owner: req.params.id })
    await Comment.deleteMany({ user: req.params.id })
    await Like.deleteMany({ user: req.params.id })
    await Follow.deleteMany({ user: req.params.id })
  }

  res.status(204).json({ message: 'Your account has been removed' })
}