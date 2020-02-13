const Router = require('koa-router');
const router = new Router({ prefix:'/api/advertisement'});
const { Auth } = require('../middlewares/auth');
const { 
	find, 
	findById, 
	create, 
	update,
	checkAdvertisementExist,
	delete:del,
} = require('../controllers/advertisement');

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkAdvertisementExist, findById);

router.patch('/:id', new Auth().m, checkAdvertisementExist, update);

router.delete('/:id', new Auth().m, checkAdvertisementExist, del);

module.exports = router;