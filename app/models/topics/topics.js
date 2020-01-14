const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const topicSchema = new Schema(
	{
		__v: {
			type: Number,
			select: false
		},
		pic: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		introduction: {
			type: String,
			select: false
		}
	},
	{ timestamps: true }
);

module.exports = model('Topic', topicSchema);
