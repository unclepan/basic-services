module.exports = {
	secret: 'antcp-jwt-secret',
	connectionStr: 'mongodb://localhost:27017/antcp',
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
			return 'smtp.qq.com';
		},
		get user(){
			return '292222369@qq.com';
		},
		get pass(){
			return 'qnnowvfnrhkncbbe';
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