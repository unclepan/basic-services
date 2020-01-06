const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		__v: {
			type: Number,
			select: false
		},
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			validate: {
				validator(v) {
					return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(v);
				},
				message: '邮箱格式不正确!'
			}
		},
		password: {
			type: String,
			required: true,
			select: false // mongoose的一个语法，获取的时候不显示
		},
		avatar_url: {
			type: String
		},
		gender: {
			type: String,
			enum: ['male', 'female'], // 枚举
			default: 'male',
			required: true
		},
		headline: {
			type: String
		},
		locations: { // 住址
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Topic'
				}
			], // 字符串数组
			select: false
		},
		business: {  // 工作
			type: Schema.Types.ObjectId,
			ref: 'Topic',
			select: false
		},
		employments: { // 行业
			type: [
				{
					company: {
						type: Schema.Types.ObjectId,
						ref: 'Topic'
					},
					job: {
						type: Schema.Types.ObjectId,
						ref: 'Topic'
					}
				}
			],
			select: false
		},
		educations: { // 教育
			type: [
				{
					school: {
						type: Schema.Types.ObjectId,
						ref: 'Topic'
					},
					major: {
						type: Schema.Types.ObjectId,
						ref: 'Topic'
					},
					diploma: {
						type: Number,
						enum: [1, 2, 3, 4, 5]
					},
					entrance_year: {
						type: Number
					},
					graduation_year: {
						type: Number
					}
				}
			],
			select: false
		},
		following: {
			// 关注者列表，关注了那些人
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'User'
				}
			],
			select: false // 隐藏，查询的时候不显示
		},
		followingTopics: {
			// 话题列表，关注了那些话题
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Topic'
				}
			],
			select: false
		},
		followingQuestions: {
			// 问题列表，关注了那些问题
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Question'
				}
			],
			select: false
		},
		likingAnswers: {
			// 赞过的答案
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Answer'
				}
			],
			select: false
		},
		dislikingAnswers: {
			// 踩过的答案
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Answer'
				}
			],
			select: false
		},
		collectingAnswers: {
			// 收藏的答案
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Answer'
				}
			],
			select: false
		}
	},
	{ timestamps: true }
);

userSchema.pre('save', function(next) {
	// 保存之前中间件
	const user = this;
	// 加盐加密，是否更改，mongoose上的方法
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods = {
	comparePassword: (_password, password) => {
		return new Promise((resolve, reject) => {
			bcrypt.compare(_password, password, (err, isMatch) => {
				if (!err) resolve(isMatch);
				else reject(err);
			});
		});
	}
};

module.exports = model('User', userSchema);
