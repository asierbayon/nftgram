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
});

const Following = mongoose.model('Following', followingSchema);
module.exports = Following;