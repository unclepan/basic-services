const Router = require('koa-router');
const router = new Router({ prefix:'/api/questions/:questionId/answers/:answerId/comments' });
const { Auth } = require('../middlewares/auth');
const { 
	find, 
	findById, 
	create, 
	update,
	checkCommentExist,
	checkCommentator,
	delete:del
} = require('../controllers/comments');


router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkCommentExist, findById);

router.patch('/:id', new Auth().m, checkCommentExist, checkCommentator, update);

router.delete('/:id', new Auth().m, checkCommentExist, checkCommentator, del);


module.exports = router;