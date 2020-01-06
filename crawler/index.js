
const Koa = require('koa');
const mongoose = require('mongoose');
// const {trailer} = require('./case');
const Case = require('./models/case');
const Router = require('koa-router');
const app = new Koa();

const { connectionCrawlerStr } = require('./config');

mongoose.connect(connectionCrawlerStr, { useNewUrlParser: true,useUnifiedTopology: true }, ()=>{
	console.log('数据库连接成功');
	// trailer();
});
mongoose.connection.on('error', console.error);
mongoose.set('useFindAndModify', false);
const router = new Router({ prefix:'/crawler' });
router.get('/cases', async (ctx)=>{
	ctx.body = await Case.find();
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3002,()=> console.log('程序启动成功在3002端口'));



