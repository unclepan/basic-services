const jwt = require('jsonwebtoken');
const { secret } = require('../config');

class Auth {
	constructor(level = 1) {
		this.level = level;
		Auth.USER = 8; // 普通用户
		Auth.ADMIN = 16; // 管理员
		Auth.SUPER_ADMIN = 32; // 超级管理员
	}
	get m() {
		return  async(ctx, next) => { // 自己编写的认证
			const { authorization = '' } = ctx.request.header;
			const token = authorization.replace('Bearer ', '');
			try {
				const user = jwt.verify(token, secret);
				if (user.scope < this.level) {
					ctx.throw(403, '权限不足');
				}
				ctx.state.user = user; // 通常放一些用户信息
			} catch (err) {
				ctx.throw(401, err.message); // 401 未认证（err.name 等于 'TokenExpiredError' 是token已过期）
			}
			await next();
		};
	}
	static verifyToken(token) {
		try {
			jwt.verify(token, global.config.security.secretKey);
			return true;
		} catch(e) {
			return false;
		}
	}
}

module.exports = {
	Auth
};