const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const answerSchema = new Schema(
	{
		__v: {
			type: Number,
			select: false
		},
		pic: { // 此答案的缩略图，可以省略
			type: String
		},
		content: {
			type: String,
			required: true
		},
		answerer: {
			// 回答者
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			select: false
		},
		questionId: { // 属于那一个问题
			type: Schema.Types.ObjectId,
			ref: 'Question',
			required: true,
			select: false
		},
		voteCount: {
			// 投票数
			type: Number,
			required: true,
			default: 0
		},
		auditStatus: { // 审核状态
			type: Number,
			select: false,
			default: 0
		}
	},
	{ timestamps: true }
);

module.exports = model('Answer', answerSchema);
