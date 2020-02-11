const Feedback = require('../models/feedback');

class FeedbackCtl {
	async find(ctx) {
		const { per_page = 10 } = ctx.query;
		const page = Math.max(ctx.query.page * 1, 1) - 1;
		const perPage = Math.max(per_page * 1, 1);
		const q = new RegExp(ctx.query.q);
		ctx.body = await Feedback.find({
			content: q
		})
			.limit(perPage)
			.skip(page * perPage);
	}
	async checkFeedbackExist(ctx, next) {
		const feedback = await Feedback.findById(ctx.params.id);
		if (!feedback) {
			ctx.throw(404, '当前反馈不存在');
		}
		ctx.state.feedback = feedback;
		await next();
	}
	async create(ctx) {
		ctx.verifyParams({
			content: { type: 'string', required: true }
		});
		const feedback = await new Feedback({
			...ctx.request.body,
			feedbacker: ctx.state.user._id
		}).save();
		ctx.body = feedback;
	}
	async delete(ctx) {
		await Feedback.findByIdAndRemove(ctx.params.id);
		ctx.status = 204;
	}
  
}
module.exports = new FeedbackCtl();
