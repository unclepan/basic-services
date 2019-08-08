const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix:'/users' });
const { 
    find, 
    findById, 
    create, 
    update, 
    delete:del, 
    login,
    checkOwner,
    listFollowing,
    listFollowers,
    checkUserExist,
    follow,
    unfollow,
    listFollowingTopic,
    followTopic,
    unfollowTopic
} = require('../controllers/users');

const {checkTopicExist} = require('../controllers/topics');

const { secret } = require('../config');

// const auth = async(ctx, next) => { // 自己编写的认证
//     const { authorization = '' } = ctx.request.header;
//     const token = authorization.replace('Bearer ', '');
//     try {
//         const user = jsonwebtoken.verify(token, secret);
//         ctx.state.user = user; // 通常放一些用户信息
//     } catch (err) {
//         ctx.throw(401, err.message); // 401 未认证
//     }
//     await next();
// };

const auth = jwt({ secret }); // 使用三方包的认证

router.get('/', find);

router.post('/', create);

router.get('/:id', findById);

router.patch('/:id', auth, checkOwner, update);

router.delete('/:id', auth, checkOwner, del);

router.post('/login', login);

router.get('/:id/following', listFollowing);

router.get('/:id/followins', listFollowers);

router.put('/following/:id', auth, checkUserExist, follow)

router.delete('/following/:id', auth, checkUserExist, unfollow)

router.get('/:id/followingTopics', listFollowingTopic);

router.put('/followingTopics/:id', auth, checkTopicExist, followTopic)

router.delete('/followingTopics/:id', auth, checkTopicExist, unfollowTopic)

module.exports = router;