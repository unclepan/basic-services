
const mongoose = require('mongoose');
const {trailer} = require('./case');

const { connectionCrawlerStr } = require('./config');

mongoose.connect(connectionCrawlerStr, { useNewUrlParser: true }, ()=>{
	console.log('数据库连接成功');
	trailer();
});
mongoose.connection.on('error', console.error);
mongoose.set('useFindAndModify', false);
