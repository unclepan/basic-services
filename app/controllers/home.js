const path = require('path');

class HomeCtl {
	index(ctx) {
		ctx.body = '这是主页';
	}
	bp(ctx) {
		ctx.body = { data: ctx.request.body, mas: '埋点测试' };
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
