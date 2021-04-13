const mongoose = require('mongoose');
const totp = require("totp-generator");
const Schema = mongoose.Schema
const PASSWORD_PATTERN = /^.{8,}$/;
const bcrypt = require('bcrypt');
const validator = require('validator');
const createError = require('http-errors');
const Follower = require('../models/follower.model');
const Following = require('../models/following.model');

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
        default: `https://avatars.dicebear.com/api/identicon/${this.username}.svg`
    },
    bio: {
        type: String,
        maxlength: [150, 'Bio is too long.'],
    },
    website: {
        type: String,
        maxlength: [65, 'This URL is too long.'],
    },
    totpSecret: {
        type: String,
        required: true,
        default: () =>
            (Math.random().toString(36).substr(2) +
                Math.random().toString(36).substr(2) +
                Math.random().toString(36).substr(2)).slice(0, 16)
    },
    password: {
        type: String,
        required: 'A valid password is required.',
        match: [PASSWORD_PATTERN, 'the password is invalid.']
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.totpSecret;
            return ret
        }
    }
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
            await Follower.create({ user: this.id });
            await Following.create({ user: this.id });
        } catch (err) {
            return next(createError(400));
        }
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};

userSchema.methods.getTOTPQR = function () {
    return `otpauth://totp/Iron%20Events:${this.email}?secret=${this.totpSecret}&issuer=Iron%20Events`
};

userSchema.methods.checkTOTP = function (code) {
    return totp(this.totpSecret)
};

const User = mongoose.model('User', userSchema);
module.exports = User;
