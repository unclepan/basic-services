const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config');
const mongoose = require('mongoose');
const {getWechat} = require('./wechat/index');
const routing = require('./routes/index');

mongoose.connect(config.db, { useNewUrlParser: true }, async ()=>{
	console.log('数据库连接成功');
	getWechat(); // 验证AccessToken
});
mongoose.connection.on('error', console.error);
mongoose.set('useFindAndModify', false);

const app = new Koa();

const router = new Router();
routing(router);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, ()=> console.log(`程序启动成功在${config.port}端口`));
