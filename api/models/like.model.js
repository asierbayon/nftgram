const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
    {
        likedBy: {
            type: Schema.ObjectId,
            ref: 'User',
        },
        asset: {
            type: Schema.ObjectId,
            ref: 'Asset',
        }
    }, 
    {
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            ret.id = doc.id;
            return ret;
        },
    }
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;