const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
	{
		likedBy: {
			type: Schema.ObjectId,
			ref: 'User',
		},
		post: {
			type: Schema.ObjectId,
			ref: 'Post',
		}
	}
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;