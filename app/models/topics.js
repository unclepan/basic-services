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
			// 简介
			type: String,
			select: false
		},
		moreInformation: {
			type: Array,
			select: false
		},
		popular: { // 是否推荐展示
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

module.exports = model('Topic', topicSchema);
