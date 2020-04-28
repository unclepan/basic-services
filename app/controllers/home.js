const path = require('path');
const BP = require('../models/bp');

class HomeCtl {
	index(ctx) {
		ctx.body = '这是主页';
	}
	async bp(ctx) {
		const {data} = ctx.request.body;
		data.forEach(element => {	
			new BP({
				bp:element,
			}).save();
		});
		
		ctx.body = { mas: '埋点测试' };
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
