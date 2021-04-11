const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followerSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    followers: [
        {
            user: {
                type: Schema.ObjectId,
                ref: 'User'
            }
        }
    ]
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret
        }
    }
});

const Follower = mongoose.model('Follower', followerSchema);
module.exports = Follower;