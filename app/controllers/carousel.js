const Carousel = require('../models/carousel');

class CarouselCtl {
	async find(ctx) {
		const { per_page = 10 } = ctx.query;
		const page = Math.max(ctx.query.page * 1, 1) - 1;
		const perPage = Math.max(per_page * 1, 1);
		const q = new RegExp(ctx.query.q);
		const { auditStatus = 0 } = ctx.query; // 审核状态
		ctx.body = await Carousel.find({
			title: q,
			auditStatus
		})
			.limit(perPage)
			.skip(page * perPage);
	}
	async checkCarouselExist(ctx, next) {
		const carousel = await Carousel.findById(ctx.params.id);
		if (!carousel) {
			ctx.throw(404, '当前轮播位不存在');
		}
		ctx.state.carousel = carousel;
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
		const carousel = await Carousel.findById(ctx.params.id)
			.select(selectFields)
			.populate(populateStr);
		ctx.body = carousel;
	}
	async create(ctx) {
		ctx.verifyParams({
			pic: { type: 'string', required: true },
			title: { type: 'string', required: true },
			link: { type: 'string', required: true },
		});
		const carousel = await new Carousel({
			...ctx.request.body,
		}).save();
		ctx.body = carousel;
	}
	async update(ctx) {
		ctx.verifyParams({
			pic: { type: 'string', required: false },
			title: { type: 'string', required: false },
			link: { type: 'string', required: false },
		});
		await ctx.state.carousel.update(ctx.request.body);
		ctx.body = ctx.state.carousel;
	}
	async delete(ctx) {
		await Carousel.findByIdAndRemove(ctx.params.id);
		ctx.status = 204;
	}
  
}
module.exports = new CarouselCtl();
