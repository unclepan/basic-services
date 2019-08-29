const Koa = require('koa');

const app = new Koa();
const PORT = 3000;

// #1
app.use(async (ctx, next)=>{
	console.log(1);
	await next();
	console.log(1);
});
// #2
app.use(async (ctx, next) => {
	console.log(2);
	await next();
	console.log(2);
});

app.use(async () => {
	console.log(3);
});

app.listen(PORT);
console.log(`http://localhost:${PORT}`);