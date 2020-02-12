// const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/api/users' });
const { Auth } = require('../middlewares/auth');
const {
	find,
	findById,
	fundByName,
	verify,
	create,
	update,
	delete: del,
	login,
	logout,
	checkOwner,
	listFollowing,
	listFollowers,
	checkUserExist,
	follow,
	unfollow,
	listFollowingTopic,
	followTopic,
	unfollowTopic,
	listQuestions,
	listFollowingQuestion,
	followQuestion,
	unfollowQuestion,
	listLikingAnswers,
	likeAnswer,
	unLikeAnswer,
	listDisLikingAnswers,
	disLikeAnswer,
	unDisLikeAnswer,
	listCollectingAnswers,
	collectAnswer,
	unCollectAnswer,
	likePeriodical,
	unLikePeriodical,
	whetherLikePeriodical
} = require('../controllers/users');

const { checkTopicExist } = require('../controllers/topics');
const { checkQuestionExist } = require('../controllers/questions');
const { checkAnswerExist } = require('../controllers/answers/answers');
const { checkPeriodicalExist } = require('../controllers/periodical/periodical');

// const { secret } = require('../config');

// 1:
// const auth = async(ctx, next) => { // 自己编写的认证
//     const { authorization = '' } = ctx.request.header;
//     const token = authorization.replace('Bearer ', '');
//     try {
//         const user = jsonwebtoken.verify(token, secret);
//         ctx.state.user = user; // 通常放一些用户信息
//     } catch (err) {
//         ctx.throw(401, err.message); // 401 未认证
//     }
//     await next();
// };

// 2:
// const auth = jwt({ secret }); // 使用三方包的认证

router.get('/', new Auth(7).m, find);

router.post('/', create);

router.get('/:id', findById);

router.get('/fund/name', fundByName);

router.get('/login/info',
	new Auth().m, 
	async(ctx, next) => {
		ctx.params.id = ctx.state.user._id;
		await next();
	}, 
	findById
);

router.patch('/:id', new Auth().m, checkOwner, update);

router.delete('/:id', new Auth().m, checkOwner, del);

router.post('/verify', verify);

router.post('/login', login);

router.post('/logout', logout);

router.get('/:id/following', listFollowing);

router.get('/:id/followins', listFollowers);

router.put('/following/:id', new Auth().m, checkUserExist, follow);

router.delete('/following/:id', new Auth().m, checkUserExist, unfollow);

router.get('/:id/followingTopics', listFollowingTopic);

router.put('/followingTopics/:id', new Auth().m, checkTopicExist, followTopic);

router.delete('/followingTopics/:id', new Auth().m, checkTopicExist, unfollowTopic);

router.get('/:id/followQuestions', listFollowingQuestion); // 用户关注问题的列表

router.put('/followQuestions/:id', new Auth().m, checkQuestionExist, followQuestion);

router.delete(
	'/followQuestions/:id',
	new Auth().m,
	checkQuestionExist,
	unfollowQuestion
);

router.get('/:id/questions', listQuestions); // 用户提出问题的列表

router.get('/:id/likingAnswers', listLikingAnswers);

router.put(
	'/likingAnswers/:id',
	new Auth().m,
	checkAnswerExist,
	likeAnswer,
	unDisLikeAnswer
);

router.delete('/likingAnswers/:id', new Auth().m, checkAnswerExist, unLikeAnswer);

router.get('/:id/dislikingAnswers', listDisLikingAnswers);

router.put(
	'/dislikingAnswers/:id',
	new Auth().m,
	checkAnswerExist,
	disLikeAnswer,
	unLikeAnswer
);

router.delete('/dislikingAnswers/:id', new Auth().m, checkAnswerExist, unDisLikeAnswer);

router.get('/:id/collectingAnswers', listCollectingAnswers);

router.put('/collectingAnswers/:id', new Auth().m, checkAnswerExist, collectAnswer);

router.delete('/collectingAnswers/:id', new Auth().m, checkAnswerExist, unCollectAnswer);

// 赞期刊
router.put(
	'/likingPeriodical/:id',
	new Auth().m,
	checkPeriodicalExist,
	likePeriodical,
);
// 取消赞期刊
router.delete('/likingPeriodical/:id', new Auth().m, checkPeriodicalExist, unLikePeriodical);
// 是否赞过该期刊
router.get('/whetherLikingPeriodical/:id', new Auth().m, checkPeriodicalExist, whetherLikePeriodical);

module.exports = router;
