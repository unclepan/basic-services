const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const questionsPopularSchema = new Schema(
	{
		__v: {
			type: Number,
			select: false
		},
		question: {
			type: Schema.Types.ObjectId,
			ref: 'Question',
			required: true,
		},
		auditStatus: { // 审核状态
			type: Number,
			select: false,
			default: 0
		}
	},
	{ timestamps: true }
);

module.exports = model('QuestionsPopular', questionsPopularSchema);
