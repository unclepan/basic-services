const Router = require('koa-router');
const router = new Router({ prefix:'/api/periodical'});
const { Auth } = require('../../middlewares/auth');
const { 
	find, 
	findById, 
	create, 
	update,
	checkPeriodicalExist,
	delete:del,
	import: im
} = require('../../controllers/periodical/periodical');

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkPeriodicalExist, findById);

router.patch('/:id', new Auth().m, checkPeriodicalExist, update);

router.delete('/:id', new Auth().m, checkPeriodicalExist, del);

router.post('/import', new Auth().m, im);


module.exports = router;