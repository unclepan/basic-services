const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');
const Question = require('../models/questions');
const Answer = require('../models/answers');
const { secret } = require('../config');

class UsersCtl {
	async find(ctx){
		const { per_page = 10 } = ctx.query;
		const page = Math.max(ctx.query.page * 1, 1) - 1;
		const perPage = Math.max(per_page * 1, 1);
		ctx.body = await User
			.find({name: new RegExp(ctx.query.q)})
			.limit(perPage)
			.skip(page * perPage);
	}
	async findById(ctx){
		const { fields = '' } = ctx.query;
		const selectFields = fields.split(';').filter(f => f).map(f => '+' + f).join(' ');
		const populateStr = fields.split(';').filter(f => f).map(f => {
			if ( f === 'employments'){
				return 'employments.company employments.job';
			}
			if(f === 'educations'){
				return 'educations.school educations.major'; 
			}
			return f;  
		}).join(' ');
		const user = await User.findById(ctx.params.id).select(selectFields).populate(populateStr); //select是mongoose语法
		if(!user){
			ctx.throw(404, '用户不存在');
		}
		ctx.body = user;
	}
	async create(ctx){
		ctx.verifyParams({
			name: { type:'string', required: true },
			password: { type:'string', required: true }
		});
		const { name } = ctx.request.body;
		const repeatedUser = await User.findOne({name});
		if(repeatedUser){
			ctx.throw(409, '用户已经存在');
		}
		const user = await new User(ctx.request.body).save();
		ctx.body = user;
	}
	async checkOwner(ctx, next){ // 自己编写的授权，跟业务代码强相关，所以写在这里
		if(ctx.params.id !== ctx.state.user._id){
			ctx.throw(403, '无权限');
		}
		await next();
	}
	async update(ctx){
		ctx.verifyParams({
			name: { type:'string', required: false },
			password: { type:'string', required: false },
			avatar_url: { type:'string', required: false },
			gender: { type:'string', required: false },
			headline: { type:'string', required: false },
			locations: { type:'array', itemType: 'string', required: false },
			business: { type:'string', required: false },
			employments: { type:'array', itemType: 'object', required: false },
			educations: { type:'array', itemType: 'object',rule: { school:'string', major:'string', diploma:'number', entrance_year:'number', graduation_year:'number' }, required: false },
		});
		const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
		if(!user){
			ctx.throw(404, '用户不存在');
		}
		ctx.body = user;
	}
	async delete(ctx){
		const user = await User.findByIdAndRemove(ctx.params.id);
		if(!user){
			ctx.throw(404, '用户不存在');
		}
		ctx.status = 204;
	}

	async login(ctx){
		ctx.verifyParams({
			name: { type:'string', required: true },
			password: { type:'string', required: true }
		});
		const user = await User.findOne(ctx.request.body);
		if(!user){
			ctx.throw(401,'用户名或者密码不正确');
		}
		const { _id, name } = user;
		const token = jsonwebtoken.sign({_id, name}, secret, { expiresIn: '1d' });
		ctx.body = {token};
	}

	async listFollowing(ctx){ // 用户关注了那些人
		const user = await User.findById(ctx.params.id).select('+following').populate('following');
		if(!user) {
			ctx.throw(404,'用户不存在');
		}
		ctx.body = user.following;
	}

	async listFollowers(ctx){ // 粉丝列表
		const users = await User.find({following: ctx.params.id});
		ctx.body = users;
	}

	async checkUserExist(ctx, next){ // 检查用户存在与否，跟业务代码强相关，所以写在这里
		const user = await User.findById(ctx.params.id);
		if(!user){
			ctx.throw(404, '用户不存在');
		}
		await next();
	}
	async follow(ctx){
		const me = await User.findById(ctx.state.user._id).select('+following');
		if(!me.following.map(id => id.toString()).includes(ctx.params.id)){
			me.following.push(ctx.params.id);
			me.save();
		}
		ctx.status = 204;
	}

	async unfollow(ctx){
		const me = await User.findById(ctx.state.user._id).select('+following');
		const index = me.following.map(id => id.toString()).indexOf(ctx.params.id);
		if(index > -1){
			me.following.splice(index, 1);
			me.save();
		}
		ctx.status = 204;
	}

	async listFollowingTopic(ctx){ // 用户关注了那些话题
		const user = await User.findById(ctx.params.id).select('+followingTopics').populate('followingTopics');
		if(!user) {
			ctx.throw(404, '用户不存在');
		}
		ctx.body = user.followingTopics;
	}

	async followTopic(ctx){
		const me = await User.findById(ctx.state.user._id).select('+followingTopics');
		if(!me.followingTopics.map(id => id.toString()).includes(ctx.params.id)){
			me.followingTopics.push(ctx.params.id);
			me.save();
		}
		ctx.status = 204;
	}

	async unfollowTopic(ctx){
		const me = await User.findById(ctx.state.user._id).select('+followingTopics');
		const index = me.followingTopics.map(id => id.toString()).indexOf(ctx.params.id);
		if(index > -1){
			me.followingTopics.splice(index, 1);
			me.save();
		}
		ctx.status = 204;
	}

	async listFollowingQuestion(ctx){ // 用户关注了那些问题
		const user = await User.findById(ctx.params.id).select('+followingQuestions').populate('followingQuestions');
		if(!user) {
			ctx.throw(404, '用户不存在');
		}
		ctx.body = user.followingQuestions;
	}

	async followQuestion(ctx){ // 关注问题
		const me = await User.findById(ctx.state.user._id).select('+followingQuestions');
		if(!me.followingQuestions.map(id => id.toString()).includes(ctx.params.id)){
			me.followingQuestions.push(ctx.params.id);
			me.save();
		}
		ctx.status = 204;
	}

	async unfollowQuestion(ctx){ // 取消关注问题
		const me = await User.findById(ctx.state.user._id).select('+followingQuestions');
		const index = me.followingQuestions.map(id => id.toString()).indexOf(ctx.params.id);
		if(index > -1){
			me.followingQuestions.splice(index, 1);
			me.save();
		}
		ctx.status = 204;
	}

	async listQuestions(ctx) { // 列出用户提出问题
		const questions = await Question.find({questioner: ctx.params.id});
		ctx.body = questions;
	}

	async listLikingAnswers(ctx){ // 列出用户赞过的答案列表
		const user = await User.findById(ctx.params.id).select('+likingAnswers').populate('likingAnswers');
		if(!user) {
			ctx.throw(404, '用户不存在');
		}
		ctx.body = user.likingAnswers;
	}

	async likeAnswer(ctx, next){ // 赞答案
		const me = await User.findById(ctx.state.user._id).select('+likingAnswers');
		if(!me.likingAnswers.map(id => id.toString()).includes(ctx.params.id)){
			me.likingAnswers.push(ctx.params.id);
			me.save();
			await Answer.findByIdAndUpdate(ctx.params.id, { $inc: {voteCount: 1} });
		}
		ctx.status = 204;
		await next();
	}

	async unLikeAnswer(ctx){ // 取消赞答案
		const me = await User.findById(ctx.state.user._id).select('+likingAnswers');
		const index = me.likingAnswers.map(id => id.toString()).indexOf(ctx.params.id);
		if(index > -1){
			me.likingAnswers.splice(index, 1);
			me.save();
			await Answer.findByIdAndUpdate(ctx.params.id, { $inc: {voteCount: -1} });
		}
		ctx.status = 204;
	}

	async listDisLikingAnswers(ctx){ // 列出用户踩过的答案列表
		const user = await User.findById(ctx.params.id).select('+dislikingAnswers').populate('dislikingAnswers');
		if(!user) {
			ctx.throw(404, '用户不存在');
		}
		ctx.body = user.dislikingAnswers;
	}

	async disLikeAnswer(ctx, next){ // 踩答案
		const me = await User.findById(ctx.state.user._id).select('+dislikingAnswers');
		if(!me.dislikingAnswers.map(id => id.toString()).includes(ctx.params.id)){
			me.dislikingAnswers.push(ctx.params.id);
			me.save();
		}
		ctx.status = 204;
		await next();
	}

	async unDisLikeAnswer(ctx){ // 取消踩答案
		const me = await User.findById(ctx.state.user._id).select('+dislikingAnswers');
		const index = me.dislikingAnswers.map(id => id.toString()).indexOf(ctx.params.id);
		if(index > -1){
			me.dislikingAnswers.splice(index, 1);
			me.save();
		}
		ctx.status = 204;
	}

	async listCollectingAnswers(ctx){ // 列出用户收藏的答案列表
		const user = await User.findById(ctx.params.id).select('+collectingAnswers').populate('collectingAnswers');
		if(!user) {
			ctx.throw(404, '用户不存在');
		}
		ctx.body = user.collectingAnswers;
	}

	async collectAnswer(ctx){ // 收藏答案
		console.log(1);
		const me = await User.findById(ctx.state.user._id).select('+collectingAnswers');
		if(!me.collectingAnswers.map(id => id.toString()).includes(ctx.params.id)){
			me.collectingAnswers.push(ctx.params.id);
			me.save();
		}
		ctx.status = 204;
	}

	async unCollectAnswer(ctx){ // 取消收藏答案
		const me = await User.findById(ctx.state.user._id).select('+collectingAnswers');
		const index = me.collectingAnswers.map(id => id.toString()).indexOf(ctx.params.id);
		if(index > -1){
			me.collectingAnswers.splice(index, 1);
			me.save();
		}
		ctx.status = 204;
	}
}
module.exports = new UsersCtl();