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
			// 简介
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
		},
		pv: {
			type: Number,
			required: true,
			default: 0
		},
		popular: { // 是否要推荐展示
			type: Boolean,
			select: false,
			default: false
		},
		auditStatus: { // 审核状态
			type: Number,
			select: false,
			default: 0
		}
	},
	{ timestamps: true }
);

module.exports = model('Question', questionSchema);
