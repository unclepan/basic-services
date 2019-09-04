const sha1 = require('sha1');
const getRawBody = require('raw-body');
const util = require('./util');

module.exports = (config, reply) => {
	return async (ctx, next) => {
		const {
			signature,
			timestamp,
			nonce,
			echostr
		} = ctx.query;
		const token = config.token;
		let str = [token, timestamp, nonce].sort().join('');
		const sha = sha1(str);
    
		if(ctx.method === 'GET'){
			if(sha === signature){
				ctx.body = echostr;
			} else {
				ctx.body= 'wrong';
			}
		} else if (ctx.method === 'POST') {
			if(sha !== signature){
				return (ctx.body = 'Failed');
			}
			const data = await getRawBody(ctx.req, {
				length: ctx.length, // 流的长度。 如果流的内容没有加到这个长度，则返回 400 错误代码
				limit: '1mb',
				encoding: ctx.charset
			});

			const content = await util.parseXML(data);
			const message = util.formatMessage(content.xml);

			ctx.weixin = message;
			await reply.apply(ctx,[ctx, next]);

			const replyBody = ctx.body;
			const msg = ctx.weixin;
			const xml = util.tpl(replyBody, msg);

			ctx.status = 200;
			ctx.type = 'application/xml';
			ctx.body = xml;
		}
	};
};