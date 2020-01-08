const Router = require('koa-router');
const router = new Router({ prefix:'/api/carousel'});
const { Auth } = require('../middlewares/auth');
const { 
	find, 
	findById, 
	create, 
	update,
	checkCarouselExist,
	delete:del,
} = require('../controllers/carousel');

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkCarouselExist, findById);

router.patch('/:id', new Auth().m, checkCarouselExist, update);

router.delete('/:id', new Auth().m, checkCarouselExist, del);

module.exports = router;