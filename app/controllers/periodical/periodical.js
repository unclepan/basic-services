const Periodical = require('../../models/periodical');
const PeriodicalPopular = require('../../models/periodical/popular');

class PeriodicalCtl {
	async find(ctx) {
		const { per_page = 10 } = ctx.query;
		const page = Math.max(ctx.query.page * 1, 1) - 1;
		const perPage = Math.max(per_page * 1, 1);
		const q = new RegExp(ctx.query.q);
		ctx.body = await Periodical.find({ $or: [{ title: q }, { description: q }] })
			.limit(perPage)
			.skip(page * perPage);
	}
	async checkPeriodicalExist(ctx, next) {
		const periodical = await Periodical.findById(ctx.params.id);
		if (!periodical) {
			ctx.throw(404, '期刊不存在');
		}
		ctx.state.periodical = periodical;
		await next();
	}
	async findById(ctx) {
		// pv统计
		await Periodical.findByIdAndUpdate(ctx.params.id, { $inc: { pv: 1 } });

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
		const periodical = await Periodical.findById(ctx.params.id)
			.select(selectFields)
			.populate(populateStr);
		ctx.body = periodical;
	}
	async create(ctx) {
		ctx.verifyParams({
			pic: { type: 'string', required: true },
			title: { type: 'string', required: true },
			content: { type: 'string', required: true },
			author: { type: 'string', required: true },
			describe: { type: 'string', required: true } 
		});
		const periodical = await new Periodical({
			...ctx.request.body,
		}).save();
		ctx.body = periodical;
	}
	async update(ctx) {
		ctx.verifyParams({
			pic: { type: 'string', required: false },
			title: { type: 'string', required: false },
			content: { type: 'string', required: false },
			author: { type: 'string', required: false },
			describe: { type: 'string', required: false } 
		});
		await ctx.state.periodical.update(ctx.request.body);
		ctx.body = ctx.state.periodical;
	}

	async delete(ctx) {
		await Periodical.findByIdAndRemove(ctx.params.id);
		ctx.status = 204;
	}

	async checkPeriodicalPopularExist(ctx, next) {
		const periodicalPopular = await PeriodicalPopular.findById(ctx.params.id);
		if (!periodicalPopular) {
			ctx.throw(404, '该热门期刊不存在');
		}
		ctx.state.periodicalPopular = periodicalPopular;
		await next();
	}

	async findPopular(ctx) {
		const { per_page = 5 } = ctx.query;
		const page = Math.max(ctx.query.page * 1, 1) - 1;
		const perPage = Math.max(per_page * 1, 1);
		ctx.body = await PeriodicalPopular.find()
			.limit(perPage)
			.skip(page * perPage)
			.populate('periodical');
	}

	async createPopular(ctx) {
		ctx.verifyParams({
			periodical: { type: 'string', required: false }
		});
		const periodicalPopular = await new PeriodicalPopular({
			...ctx.request.body,
		}).save();
		ctx.body = periodicalPopular;
	}

	async deletePopular(ctx) {
		await PeriodicalPopular.findByIdAndRemove(ctx.params.id);
		ctx.status = 204;
	}
  
	// async import(ctx){
	// 	const arr = ctx.request.body.map(item => {
	// 		return {
	// 			pic: `/2019112/${item.caseId}/${item.imgUrl}`,
	// 			title: item.title,
	// 			content: item.content,
	// 			author: item.author,
	// 			describe: item.describe,
	// 		};
	// 	});
	// 	const periodicals = await Periodical.insertMany(arr);
	// 	ctx.body = periodicals;
	// }
}
module.exports = new PeriodicalCtl();
