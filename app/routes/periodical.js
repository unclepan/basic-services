const Router = require('koa-router');
const router = new Router({ prefix:'/api/periodical'});
const { Auth } = require('../middlewares/auth');
const { 
	find, 
	findById, 
	create, 
	update,
	checkPeriodicalExist,
	delete:del,
	findPopular,
	createPopular,
	checkPeriodicalPopularExist,
	deletePopular,
	// import: im
} = require('../controllers/periodical');

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkPeriodicalExist, findById);

router.patch('/:id', new Auth().m, checkPeriodicalExist, update);

router.delete('/:id', new Auth().m, checkPeriodicalExist, del);

// 热门期刊
router.get('/popular/index', findPopular);

router.post('/popular/index', new Auth().m, createPopular);

router.delete('/popular/index/:id', new Auth().m, checkPeriodicalPopularExist, deletePopular);

// router.post('/import', new Auth().m, im);


module.exports = router;