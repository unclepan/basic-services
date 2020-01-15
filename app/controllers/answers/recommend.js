const RecommendAnswer = require('../../models/answers/recommend');
const User = require('../../models/users');
const Comment = require('../../models/answers/comments');

class RecommendAnswerCtl {
	async find(ctx) {
		const { per_page = 10 } = ctx.query;
		const page = Math.max(ctx.query.page * 1, 1) - 1;
		const perPage = Math.max(per_page * 1, 1);
		const ra = await RecommendAnswer.find().populate({
			path: 'answerId',
			populate: ('questionId answerer')
		})
			.limit(perPage)
			.skip(page * perPage);

		//是否赞过或者踩过，已经是否收藏过该答案
		const me = await User.findById(ctx.state.user._id).select('likingAnswers dislikingAnswers collectingAnswers');	
		ctx.body = await Promise.all(ra.map(async(item) => {
			return (async() => {
				const likeNum = await User.count({ likingAnswers: item.answerId._id });
				const commentNum = await Comment.count({ answerId: item.answerId._id, rootCommentId: null, auditStatus: 0 });

				const isLike = !!me.likingAnswers.find(i=> i.toString() === item.answerId._id.toString());
				const isDislike = !!me.dislikingAnswers.find(i=> i.toString() === item.answerId._id.toString());
				const isCollect = !!me.collectingAnswers.find(i=> i.toString() === item.answerId._id.toString());
				const {pic, content, answerer, questionId, voteCount} = item.answerId;
				return {
					id: item.answerId._id,
					pic,
					content,
					answerer,
					questionId,
					voteCount,
					isLike, 
					isDislike, 
					isCollect,
					likeNum,
					commentNum,
					showComments: false
				};
			})();
		}));
	}
	async checkAnswerExist(ctx, next) {
		const recommendAnswer = await RecommendAnswer.findById(ctx.params.id);
		if (!recommendAnswer) {
			ctx.throw(404, '推荐的回答不存在');
		}
		ctx.state.recommendAnswer = recommendAnswer;
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
		const recommendAnswer = await RecommendAnswer.findById(ctx.params.id)
			.select(selectFields)
			.populate(populateStr);
		ctx.body = recommendAnswer;
	}
	async create(ctx) {
		ctx.verifyParams({
			answerId: { type: 'string', required: true }
		});
		const recommendAnswer = await new RecommendAnswer({
			...ctx.request.body
		}).save();
		ctx.body = recommendAnswer;
	}
	async delete(ctx) {
		await RecommendAnswer.findByIdAndRemove(ctx.params.id);
		ctx.status = 204;
	}
}
module.exports = new RecommendAnswerCtl();
