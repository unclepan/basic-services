const Router = require('koa-router');
const router = new Router({ prefix:'/api/questions/:questionId/answers' });
const { Auth } = require('../middlewares/auth');
const { 
	find, 
	findById, 
	create, 
	update,
	checkAnswerExist,
	checkAnswerer,
	delete:del
} = require('../controllers/answers');


router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkAnswerExist, findById);

router.patch('/:id', new Auth().m, checkAnswerExist, checkAnswerer, update);

router.delete('/:id', new Auth().m, checkAnswerExist, checkAnswerer, del);


module.exports = router;