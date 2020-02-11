const Router = require('koa-router');
const router = new Router({ prefix:'/api/feedback'});
const { Auth } = require('../middlewares/auth');
const { 
	find, 
	create, 
	checkFeedbackExist,
	delete:del,
} = require('../controllers/feedback');

router.get('/', find);

router.post('/', new Auth().m, create);

router.delete('/:id', new Auth().m, checkFeedbackExist, del);

module.exports = router;