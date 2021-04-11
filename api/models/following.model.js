const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followingSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    following: [
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
    
const Following = mongoose.model('Following', followingSchema);
module.exports = Following;