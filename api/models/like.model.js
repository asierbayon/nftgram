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
	}
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;