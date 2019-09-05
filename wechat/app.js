const Koa = require('koa');
const koaStatic = require('koa-static');
const { resolve, join } = require('path');
const Router = require('koa-router');
const views = require('koa-views');
const config = require('./config');
const mongoose = require('mongoose');
const moment = require('moment');
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

app.use(koaStatic(join(__dirname, 'public')));

// Must be used before any router is used
app.use(views(resolve(__dirname, './views'), {
	extension: 'pug',
	options: {
		moment: moment // 可以在pug全局访问moment
	}
}));

routing(router);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, ()=> console.log(`程序启动成功在${config.port}端口`));
