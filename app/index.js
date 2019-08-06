const _ = require('lodash');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const path = require('path');
const app = new Koa();
const routing = require('./routes');
const { connectionStr } = require('./config');

mongoose.connect(connectionStr, { useNewUrlParser: true }, ()=>console.log('数据库连接成功'));
mongoose.connection.on('error', console.error);

app.use(koaStatic(path.join(__dirname, 'public')));

app.use(error({ // 错误处理
    postFormat: (e, obj) => process.env.NODE_ENV === 'production' ? _.omit(obj, 'stack') : obj
}));
app.use(koaBody({
    multipart: true, // 支持 multipart-formdate 的表单，意思就是支持文件上传(文件的Content-Type就叫multipart-formdate)
    formidable: { // koa-body集成了formidable包
        uploadDir: path.join(__dirname, '/public/uploads'),
        keepExtensions: true //保留拓展名
    }
}));
// parameter(app);
app.use(parameter(app));
routing(app);

app.listen(3000,()=> console.log('程序启动成功在3000端口'));