const path = require('path');
const BP = require('../models/bp');
const moment = require('moment');

class HomeCtl {
	index(ctx) {
		ctx.body = '这是主页';
	}
	async bpCreate(ctx) {
		const {data} = ctx.request.body;
		let v = JSON.parse(data);
	
		for(let i = 0; i < v.length; i++){
			new BP({
				bp: {...v[i], tFom: moment(v[i].t).format('YYYY/MM/DD HH:mm:ss')},
			}).save();
		}
		ctx.body = { mas: '埋点测试' };
	}
	async bpFind(ctx) {
		ctx.body = await BP.find();
	}
	upload(ctx) {
		const file = ctx.request.files.file;
		const basename = path.basename(file.path);
		ctx.body = {
			url: `${ctx.origin}/uploads/${basename}`
		};
	}
}

module.exports = new HomeCtl();
