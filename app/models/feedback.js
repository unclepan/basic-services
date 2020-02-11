const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const feedbackSchema = new Schema(
	{
		__v: {
			type: Number,
			select: false
		},
		content: {
			type: String,
			required: true, // 验证必填
			max: 360, // 最大值验证
			min: 3 // 最小值验证
		},
		feedbacker: {
			// 反馈的人
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			select: false
		},
	},
	{ timestamps: true }
);

module.exports = model('Feedback', feedbackSchema);
