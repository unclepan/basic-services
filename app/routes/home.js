const Router = require('koa-router');
const router = new Router({
	prefix: '/api'
});
const { index, upload, bpCreate, bpFind } = require('../controllers/home');

router.get('/', index);
router.post('/upload', upload);
router.post('/bp', bpCreate);
router.get('/bp', bpFind);

module.exports = router;
