const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        user: {
            type: Schema.ObjectId,
            ref: 'User',
            required: true
        },
        asset: {
            type: Schema.ObjectId,
            ref: 'Asset',
            required: true,
        },
        body: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret._id;
                delete ret.__v;
                ret.id = doc.id;
                return ret;
            },
        }
    });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;