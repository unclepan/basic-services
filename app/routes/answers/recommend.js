const Router = require('koa-router');
const router = new Router({ prefix:'/api/answers/recommend' });
const { Auth } = require('../../middlewares/auth');
const { 
	find, 
	findById, 
	create, 
	checkAnswerExist,
	delete:del
} = require('../../controllers/answers/recommend');


router.get('/', new Auth().m, find);

router.post('/', new Auth().m, create);

router.get('/:id', new Auth().m, checkAnswerExist, findById);

router.delete('/:id', new Auth().m, checkAnswerExist, del);


module.exports = router;