const Koa = require('koa');
const wechat = require('./wechat-lib/middleware');
const config = require('./config/config');
const { reply } = require('./wechat/reply');

// 生成服务器实例
const app = new Koa();

// 加载认证中间件
// ctx 是Koa的应用上下文
// next 就是串联中间件的钩子函数
app.use(wechat(config.wechat, reply));

app.listen(config.port, ()=> console.log(`程序启动成功在${config.port}端口`));