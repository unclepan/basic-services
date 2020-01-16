const Topic = require('../models/topics');
const User = require('../models/users');
const Question = require('../models/questions/questions');
const Periodical = require('../models/periodical/periodical');

class TopicCtl {
	async find(ctx) {
		const { per_page = 10 } = ctx.query;
		const page = Math.max(ctx.query.page * 1, 1) - 1;
		const perPage = Math.max(per_page * 1, 1);
		const q = new RegExp(ctx.query.q);
		const { auditStatus = 1, popular = false } = ctx.query;
		ctx.body = await Topic.find({ 
			name: q,
			auditStatus,
			popular
		})
			.limit(perPage)
			.skip(page * perPage);
	}
	async checkTopicExist(ctx, next) {
		const topic = await Topic.findById(ctx.params.id);
		if (!topic) {
			ctx.throw(404, '话题不存在');
		}
		await next();
	}
	async findById(ctx) {
		const { fields = '' } = ctx.query;
		const selectFields = fields
			.split(';')
			.filter((f) => f)
			.map((f) => '+' + f)
			.join(' ');
		const topic = await Topic.findById(ctx.params.id).select(selectFields);
		ctx.body = topic;
	}
	async create(ctx) {
		ctx.verifyParams({
			name: { type: 'string', required: true },
			pic: { type: 'string', required: true },
			introduction: { type: 'string', required: false }
		});
		const topic = await new Topic(ctx.request.body).save();
		ctx.body = topic;
	}
	async update(ctx) {
		ctx.verifyParams({
			name: { type: 'string', required: false },
			pic: { type: 'string', required: false },
			introduction: { type: 'string', required: false }
		});
		const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body);
		if (!topic) {
			ctx.throw(404, '话题不存在');
		}
		ctx.body = topic; // topic是更新前的
	}
	async listTopicFollowers(ctx) {
		// 获取这个话题有那些关注者
		const users = await User.find({ followingTopics: ctx.params.id });
		ctx.body = users;
	}

	async listQuestions(ctx) {
		// 话题的问题列表
		const questions = await Question.find({ topics: ctx.params.id });
		ctx.body = questions;
	}

	async listPeriodicals(ctx) {
		// 话题下有那些期刊
		const periodical = await Periodical.find({ topics: ctx.params.id });
		ctx.body = periodical;
	}
}
module.exports = new TopicCtl();
