const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        following: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = doc._id;
                delete ret._id;
                delete ret.__v;
                return ret
            }
        }
    }
);

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;