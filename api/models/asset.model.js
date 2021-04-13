const User = require('./user.model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: 'Image is required',
        validate: {
            validator: function (value) {
                try {
                    const url = new URL(value);
                    return url.protocol === 'http:' || url.protocol === 'https:'
                } catch (error) {
                    return false;
                }
            },
            message: props => `Invalid image URL`
        }
    },
    assetContractAddress: {
        type: String,
        required: 'Asset contract address is required.'
    },
    tokenId: {
        type: String,
        required: 'Token id is required.'
    },
    url: {
        type: String,
        required: 'URL is required.'
    },
    owner: {
        ref: 'User',
        type: Schema.ObjectId,
        require: 'Owner is required'
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            ret.id = doc.id;
            return ret;
        },
        virtuals: true
    },
    toObject: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret
        },
        virtuals: true
    }
});

assetSchema.virtual("likes", {
    ref: "Like",
    foreignField: "asset",
    localField: "_id",
    count: true,
});

assetSchema.virtual("comments", {
    ref: "Comment",
    foreignField: "asset",
    localField: "_id",
    count: true,
});

const Asset = mongoose.model('Asset', assetSchema);
module.exports = Asset;
