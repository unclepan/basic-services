const Question = require('../models/questions/questions');
const QuestionsPopular = require('../models/questions/popular');

class QuestionsCtl {
	async find(ctx) {
		const { per_page = 10 } = ctx.query;
		const page = Math.max(ctx.query.page * 1, 1) - 1;
		const perPage = Math.max(per_page * 1, 1);
		const q = new RegExp(ctx.query.q);
		ctx.body = await Question.find({ $or: [{ title: q }, { description: q }] })
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
			title: { type: 'string', required: true },
			description: { type: 'string', required: false }
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
			title: { type: 'string', required: false },
			description: { type: 'string', required: false }
		});
		await ctx.state.question.update(ctx.request.body);
		ctx.body = ctx.state.question;
	}
	async delete(ctx) {
		await Question.findByIdAndRemove(ctx.params.id);
		ctx.status = 204;
	}

	async checkQuestionsPopularExist(ctx, next) {
		const questionsPopular = await QuestionsPopular.findById(ctx.params.id);
		if (!questionsPopular) {
			ctx.throw(404, '该热门问题不存在');
		}
		ctx.state.questionsPopular = questionsPopular;
		await next();
	}

	async findPopular(ctx) {
		const { per_page = 5 } = ctx.query;
		const page = Math.max(ctx.query.page * 1, 1) - 1;
		const perPage = Math.max(per_page * 1, 1);
		ctx.body = await QuestionsPopular.find()
			.limit(perPage)
			.skip(page * perPage)
			.populate('question');
	}

	async createPopular(ctx) {
		ctx.verifyParams({
			question: { type: 'string', required: false }
		});
		const questionsPopular = await new QuestionsPopular({
			...ctx.request.body,
		}).save();
		ctx.body = questionsPopular;
	}

	async deletePopular(ctx) {
		await QuestionsPopular.findByIdAndRemove(ctx.params.id);
		ctx.status = 204;
	}
}
module.exports = new QuestionsCtl();
