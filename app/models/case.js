const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const caseSchema = new Schema({
	__v: {
		type: Number,
		select: false
	},
	caseId: { // 原始id
		type: String,
		required: true,
	},
	title: { // 标题
		type: String,
		required: true,
	},
	score: { // 评分
		type: String,
		required: true,
	},
	describe: { // 描述
		type: String,
		required: true,
	},
	imgUrl: { // 头图
		type: String,
		required: true,
	}
}, { timestamps: true });

module.exports = model('Case', caseSchema); 
