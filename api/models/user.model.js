const mongoose = require('mongoose');
const Schema = mongoose.Schema
const PASSWORD_PATTERN = /^.{8,}$/;
const bcrypt = require('bcrypt');
const validator = require('validator');
const createError = require('http-errors');
const Asset = require('../models/asset.model');
const Comment = require('../models/comment.model');
const Follow = require('../models/follow.model');
const Like = require('../models/like.model');

const userSchema = new Schema({
  fullName: {
    type: String,
    required: 'Full name is required',
    maxlength: [50, 'Your name is too long']
  },
  username: {
    type: String,
    required: 'An username is required.',
    unique: true,
    lowercase: true,
    minlength: [3, 'Your username is too short'],
    maxlength: [35, 'Your username is too long'],
    validate: (value) => {
      if (!validator.isAlphanumeric(value)) {
        throw new Error('Your username can only contain letters and numbers');
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'There is already an account using this email'],
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email address.');
      }
    },
  },
  avatar: {
    type: String,
    default: function () {
      return `https://avatars.dicebear.com/api/identicon/${this.username}.svg`
    },
  },
  bio: {
    type: String,
    maxlength: [150, 'Bio is too long.'],
  },
  website: {
    type: String,
    validate: (value) => {
      if (value && !validator.isURL(value, { require_protocol: true })) {
        throw new Error('Invalid URL.');
      }
    },
    maxlength: [65, 'This URL is too long.'],
  },
  ethAddress: {
    type: String,
    validate: (value) => {
      if (value && !validator.isEthereumAddress(value)) {
        throw new Error('Invalid Ethereum address.');
      }
    },
  },
  password: {
    type: String,
    required: 'A valid password is required.',
    match: [PASSWORD_PATTERN, 'Invalid password']
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret
    }
  },
  toObject: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret
    },
    virtuals: true
  }
});

userSchema.virtual("followers", {
  ref: "Follow",
  foreignField: "following",
  localField: "_id",
});

userSchema.virtual("following", {
  ref: "Follow",
  foreignField: "user",
  localField: "_id",
});

userSchema.virtual("followersCount", {
  ref: "Follow",
  foreignField: "following",
  localField: "_id",
  count: true,
});

userSchema.virtual("followingCount", {
  ref: "Follow",
  foreignField: "user",
  localField: "_id",
  count: true,
});



userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const document = await User.findOne({
        $or: [{ email: this.email }, { username: this.username }],
      });
      if (document) return next(createError(400, 'A user with that email or username already exists.'));
    } catch (err) {
      return next(createError(400));
    }
  }
});

userSchema.post('remove', function (next) {
  Asset.deleteMany({ owner: req.params.id }).then(
    Comment.deleteMany({ user: req.params.id }).then(
      Like.deleteMany({ likedBy: req.params.id }).then(
        Follow.deleteMany({ user: req.params.id }).then(
          next()
        )
      )
    )
  ).catch(next(error))
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
