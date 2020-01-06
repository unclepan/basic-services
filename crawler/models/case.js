const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const caseSchema = new Schema({
	__v: {
		type: Number,
		select: false
	},
	link:{ // 原始页面链接
		type: String,
		required: true,
	},
	caseId: { // 原始id
		type: String,
		required: true,
	},
	title: { // 标题
		type: String,
		required: true,
	},
	describe: { // 描述
		type: String,
		required: true,
	},
	imgUrl: { // 头图
		type: String,
	},
	author: { //作者
		type: String,
	},
	content:{ //正文
		type: String,
	},
}, { timestamps: true });

module.exports = model('Case', caseSchema); 
