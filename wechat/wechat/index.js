const Wechat = require('../wechat-lib');
const WechatOAuth = require('../wechat-lib/oauth');
const config = require('../config');

const Token = require('../models/token');
const Ticket = require('../models/ticket');

const wechatCfg = {
	wechat: {
		appID: config.wechat.appID,
		appSecret: config.wechat.appSecret,
		token: config.wechat.token,
		getAccessToken: async () => {
			const res = await Token.getAccessToken();
			return res;
		},
		saveAccessToken: async (data) => {
			const res = await Token.saveAccessToken(data);
			return res;
		},
		getTicket: async () => {
			const res = await Ticket.getTicket();
			return res;
		},
		saveTicket: async (data) => {
			const res = await Ticket.saveTicket(data);
			return res;
		}
	}
};

exports.getWechat = () => new Wechat(wechatCfg.wechat);
exports.getOAuth = () => new WechatOAuth(wechatCfg.wechat);

