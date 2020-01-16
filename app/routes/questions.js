const Router = require('koa-router');
const router = new Router({ prefix:'/api/questions' });
const { Auth } = require('../middlewares/auth');
const { 
	find, 
	findById, 
	create, 
	update,
	checkQuestionExist,
	checkQuestioner,
	delete:del,
	findPopular,
	createPopular,
	checkQuestionsPopularExist,
	deletePopular
} = require('../controllers/questions');

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkQuestionExist, findById);

router.patch('/:id', new Auth().m, checkQuestionExist, checkQuestioner, update);

router.delete('/:id', new Auth().m, checkQuestionExist, checkQuestioner, del);

// 热门问题
router.get('/popular/index', findPopular);

router.post('/popular/index', new Auth().m, createPopular);

router.delete('/popular/index/:id', new Auth().m, checkQuestionsPopularExist, deletePopular);


module.exports = router;