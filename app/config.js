module.exports = {
	secret: 'zhihu-jwt-secret',
	connectionStr: 'mongodb://localhost:27017/zhihu-test',
	connectionCrawlerStr: 'mongodb://localhost:27017/crawler',// 爬虫数据库
	redis:{
		get host(){
			return '127.0.0.1';
		},
		get port(){
			return 6379;
		}
	},
	smtp:{
		get host(){
			return 'smtp.163.com';
		},
		get user(){
			return 'qjerjwkljkaejklr@163.com';
		},
		get pass(){
			return 'yangpan123456789';
		},
		get code(){
			return ()=>{
				return Math.random().toString(16).slice(2,6).toUpperCase();
			};
		},
		get expire(){
			return ()=>{
				return new Date().getTime()+60*1000;
			};
		}
	}
};