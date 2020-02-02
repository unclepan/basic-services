const Router = require('koa-router');
const router = new Router({ prefix:'/api/answers/popular' });
const { Auth } = require('../../middlewares/auth');
const { 
	popular,
	assInfo 
} = require('../../controllers/answers/answers');


router.get('/', new Auth().m, popular, assInfo);

module.exports = router;