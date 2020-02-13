const _ = require('lodash');
const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const path = require('path');

const routing = require('./routes');
const { connectionStr } = require('./config');
const app = new Koa();
// 跨域
app.use(cors());

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>console.log('数据库连接成功'));
mongoose.connection.on('error', console.error);


// console.log('测试环境变量',process.env.NODE_ENV);

app.use(koaStatic(path.join(__dirname, 'public')));

app.use(error({ // 错误处理
	postFormat: (e, obj) => process.env.NODE_ENV === 'production' ? _.omit(obj, 'stack') : obj
}));
app.use(koaBody({
	multipart: true, // 支持 multipart-formdate 的表单，意思就是支持文件上传(文件的Content-Type就叫multipart-formdate)
	formidable: { // koa-body集成了formidable包
		uploadDir: path.join(__dirname, '/public/uploads'),
		keepExtensions: true //保留拓展名
	},
	formLimit: '10mb',
	jsonLimit: '10mb',
	textLimit: '10mb',
	enableTypes: ['json', 'form', 'text']
}));

// 参数校验
app.use(parameter(app));
routing(app);

app.listen(3001,()=> console.log('程序启动成功在3001端口'));