const { reply } = require('../wechat/reply');
const config = require('../config');
const { getOAuth } =  require('../wechat/index');
const api = require('../api/index');
const wechatMiddle = require('../wechat-lib/middleware');

// 接入微信消息中间件
exports.sdk = async (ctx) => {
	// 获取完整的请求URL，包括 protocol，host 和 url
	const url = ctx.href;
	const params = await api.wechat.getSignature(url);
	await ctx.render('wechat/sdk', params);
};

// 接入微信消息中间件
exports.hear = async (ctx, next) => {
	const middle = wechatMiddle(config.wechat, reply);
	await middle(ctx, next);
};

exports.oauth = async (ctx) => {
	const oauth = getOAuth();
	const state = ctx.query.id;
	const scope = 'snsapi_userinfo';
	const target = config.baseUrl + 'userinfo';
	const url = oauth.getAuthorizeURL(scope, target, state);
	
	ctx.redirect(url);
};

exports.userinfo = async (ctx) => {
	const oauth = getOAuth();
	const code = ctx.query.code;
	const data = await oauth.fetchAccessToken(code);
	const userData = await oauth.getUserInfo(data.access_token, data.openid);

	ctx.body = userData;
};