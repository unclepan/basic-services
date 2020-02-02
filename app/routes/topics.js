const Router = require('koa-router');
const router = new Router({ prefix:'/api/topics' });
const { Auth } = require('../middlewares/auth');
const { 
	find, 
	findById, 
	create, 
	update,
	listTopicFollowers,
	checkTopicExist,
	listQuestions,
	listPeriodicals,
	informationStatistics
} = require('../controllers/topics');

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkTopicExist, findById);

router.patch('/:id', new Auth().m, checkTopicExist, update);

router.get('/:id/followers', checkTopicExist, listTopicFollowers);

router.get('/:id/questions', checkTopicExist, listQuestions);

router.get('/:id/periodicals', checkTopicExist, listPeriodicals);

router.get('/:id/information/statistics', new Auth().m, checkTopicExist, informationStatistics);

module.exports = router;