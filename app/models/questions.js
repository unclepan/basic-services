const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const questionSchema = new Schema(
	{
		__v: {
			type: Number,
			select: false
		},
		pic: {
			type: String
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String
		},
		questioner: {
			// 提问者
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			select: false
		},
		topics: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Topic'
				}
			],
			select: false
		}
	},
	{ timestamps: true }
);

module.exports = model('Question', questionSchema);
