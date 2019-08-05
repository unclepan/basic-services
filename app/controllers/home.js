class HomeCtl {
    index(ctx, next) {
        ctx.body = '这是主页'
    }
    upload(ctx) {
        const file =  ctx.request.files.file;
        ctx.body = {
            path:file.path
        }
    }
}

module.exports = new HomeCtl();