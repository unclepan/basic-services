const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix:'/topics' });
const { 
    find, 
    findById, 
    create, 
    update,
    listTopicFollowers,
    checkTopicExist
} = require('../controllers/topics');

const { secret } = require('../config');

const auth = jwt({ secret }); // 使用三方包的认证

router.get('/', find);

router.post('/', auth, create);

router.get('/:id', checkTopicExist, findById);

router.patch('/:id', auth, checkTopicExist, update);

router.get('/:id/followers',checkTopicExist, listTopicFollowers);

module.exports = router;