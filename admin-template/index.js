const Koa = require('koa');  // 引入koa框架
const path = require('path');
const KoaStatic = require('koa-static');

const app = new Koa();

app.use(KoaStatic(path.join( __dirname, './static')));

app.listen(8888);