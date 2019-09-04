const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const TokenSchema = new Schema({
	name: String, // accessToken
	token: String,
	expires_in: Number,
}, { timestamps: true });


TokenSchema.statics = {
	async getAccessToken () {
		const token = await this.findOne({
			name: 'access_token'
		});
		if (token && token.token) {
			token.access_token = token.token;
		}
		return token;
	},

	async saveAccessToken(data) {
		let token = await this.findOne({
			name: 'access_token'
		});
		if (token) {
			token.token = data.access_token;
			token.expires_in = data.expires_in;
		} else {
			token = new Token({
				name: 'access_token',
				token: data.access_token,
				expires_in: data.expires_in
			});
		}
		await token.save();
		return data;
	}
};

const Token = model('Token', TokenSchema); 
module.exports = Token;