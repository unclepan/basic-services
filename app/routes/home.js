const Router = require('koa-router');
const router = new Router({
	prefix: '/api'
});
const { index, upload, bp } = require('../controllers/home');

router.get('/', index);
router.post('/upload', upload);
router.post('/bp', bp);

module.exports = router;
