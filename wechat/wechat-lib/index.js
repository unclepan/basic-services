const request = require('request-promise');
const base  = 'https://api.weixin.qq.com/cgi-bin/';
const api = {
	accessToken: `${base}token?grant_type=client_credential`
};

module.exports = class Wechat {
	constructor(opts) {
		this.opts = Object.assign({}, opts);
		this.appID = opts.appID;
		this.appSecret = opts.appSecret;
		this.getAccessToken = opts.getAccessToken;
		this.saveAccessToken = opts.saveAccessToken;
    
		// this.getTicket = opts.getTicket;
		// this.saveTicket = opts.saveTicket;

		this.fetchAccessToken();
	}
	async request (options) {
		options = Object.assign({}, options, { json: true });

		try {
			const res = await request(options);

			return res;
		} catch (err) {
			console.log(err);
		}
	}

	// 1. 首先检查数据库里的 token 是否过期
	// 2. 过期则刷新
	// 3. token 入库
	async fetchAccessToken () {
		let data = await this.getAccessToken();

		if (!this.isValid(data, 'access_token')) {
			data = await this.updateAccessToken();
		}

		await this.saveAccessToken(data);
		return data;
	}
	// 获取 token
	async updateAccessToken () {
		const url = `${api.accessToken}&appid=${this.appID}&secret=${this.appSecret}`;

		const data = await this.request({ url });
		const now = new Date().getTime();
		const expiresIn = now + (data.expires_in - 20) * 1000;

		data.expires_in = expiresIn;

		return data;
	}
	isValid (data, name) {
		if (!data || !data[name].expires_in) {
			return false;
		}
		const expiresIn = data.expires_in;
		const now = new Date().getTime();

		if (now < expiresIn) {
			return true; // 没有失效
		} else {
			return false;
		}
	}
};