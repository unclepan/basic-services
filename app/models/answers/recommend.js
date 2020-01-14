const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const recommendAnswerSchema = new Schema(
	{
		__v: {
			type: Number,
			select: false
		},
		answerId: {
			type: Schema.Types.ObjectId,
			ref: 'Answer',
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

module.exports = model('RecommendAnswer', recommendAnswerSchema);
