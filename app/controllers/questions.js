const Question = require('../models/questions');
const User = require('../models/users');
const Answer = require('../models/answers/answers');

class QuestionsCtl {
	async find(ctx) {
		const { per_page = 10 } = ctx.query;
		const page = Math.max(ctx.query.page * 1, 1) - 1;
		const perPage = Math.max(per_page * 1, 1);
		const q = new RegExp(ctx.query.q);
		const { auditStatus = 1 } = ctx.query; // 审核状态
		const { popular = false } = ctx.query; // 是否推荐
		ctx.body = await Question.find({ 
			$or: [{ title: q }, { description: q }],
			auditStatus,
			popular 
		})
			.limit(perPage)
			.skip(page * perPage);
	}
	async checkQuestionExist(ctx, next) {
		const question = await Question.findById(ctx.params.id).select(
			'+questioner'
		);
		if (!question) {
			ctx.throw(404, '问题不存在');
		}
		ctx.state.question = question;
		await next();
	}
	async findById(ctx) {
		// pv统计
		await Question.findByIdAndUpdate(ctx.params.id, { $inc: { pv: 1 } });

		const { fields = '' } = ctx.query;
		const selectFields = fields
			.split(';')
			.filter((f) => f)
			.map((f) => '+' + f)
			.join(' ');
		const populateStr = fields
			.split(';')
			.filter((f) => f)
			.map((f) => f)
			.join(' ');
		const question = await Question.findById(ctx.params.id)
			.select(selectFields)
			.populate(populateStr);
		ctx.body = question;
	}
	async create(ctx) {
		ctx.verifyParams({
			pic: { type: 'string', required: false },
			title: { type: 'string', required: true },
			description: { type: 'string', required: false },
			topics: { type: 'array', required: false },
		});
		const question = await new Question({
			...ctx.request.body,
			questioner: ctx.state.user._id
		}).save();
		ctx.body = question;
	}
	async checkQuestioner(ctx, next) {
		const { question } = ctx.state;
		if (question.questioner.toString() !== ctx.state.user._id) {
			ctx.throw(403, '没有权限');
		}
		await next();
	}
	async update(ctx) {
		ctx.verifyParams({
			pic: { type: 'string', required: false },
			title: { type: 'string', required: false },
			description: { type: 'string', required: false },
			topics: { type: 'array', required: false },
			popular: { type: 'boolean', required: false },
			auditStatus: { type: 'number', required: false } 
		});
		await ctx.state.question.update(ctx.request.body);
		ctx.body = ctx.state.question;
	}
	async delete(ctx) {
		await Question.findByIdAndRemove(ctx.params.id);
		ctx.status = 204;
	}
	async informationStatistics(ctx) {
		// 当前用户是否关注这个问题，这个问题的关注人数，有多少个回答，问题的浏览数
		const me = await User.findById(ctx.state.user._id).select('+followingQuestions');
		const index = me.followingQuestions
			.map((id) => id.toString())
			.indexOf(ctx.params.id);
		let followingQuestion = false;
		if (index > -1) {
			followingQuestion = true;
		} else {
			followingQuestion = false;
		}

		const followingQuestionNum = await User.countDocuments({ followingQuestions: ctx.params.id });
		const answersNum = await Answer.countDocuments({ questionId: ctx.params.id, auditStatus: 1  });
		
		ctx.body = {followingQuestion, followingQuestionNum, answersNum};
	}
}
module.exports = new QuestionsCtl();
