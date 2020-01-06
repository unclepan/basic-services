const puppeteer = require('puppeteer');
const url = 'http://www.voicer.me/';

const sleep = time => new Promise(resolve => {
	setTimeout(resolve, time);
});
 
(async () => {
	console.log('Start visit ths target page');
	const browser = await puppeteer.launch({ //生成browser实例
		args: ['--no-sandbox'],
		dumpio: false,
		timeout: 0 // 默认超时为30秒，设置为0则表示不设置超时
	});
	const page = await browser.newPage(); //解析一个新的页面。页面是在默认浏览器上下文创建的
	await page.goto(url, { // 跳转到 配置的url
		waitUntil:'networkidle2'
	});
	await page.setViewport({
		width: 1200,
		height: 800
	});
	// await autoScroll(page);
	await sleep(5000);
	await page.waitForSelector('.btnGetMeMore');

	// let result;

	for (let i = 0; i < 10; i++) {
		await page.click('.btnGetMeMore');
		await sleep(5000);
		const textArray = await page.$$eval('#moreInspiration .postItem  a[rel=bookmark]', els => Array.from(els).map(el=> {
			return {
				caseId: el.href.replace('http://www.voicer.me/archives/', ''),
				link:el.href ,
				describe:el.childNodes[5].textContent,
				title:el.childNodes[3].textContent};
		}));
		process.send({textArray:textArray.slice(40)});
	}

	// for (let i = 0; i < 30; i++) {
	// 	await page.click('.downloadMore1');
	// 	await sleep(6000);
	// 	result = await page.evaluate(() => {
	// 		var $ = window.$;
	// 		var items = $('.w_l_inner_case_more li').slice(-12);
	// 		var links = [];
	// 		if(items.length >= 1) {
	// 			items.each((index, item) => {
	// 				let it = $(item);
	// 				let title = it.find('.mian_text_title a').text();
	// 				let score = it.find('.num_ping:eq(0)').text();
	// 				let describe = it.find('.title_img div span').text();
	// 				let imgUrl = it.find('.title_img img').attr('src');
	// 				let caseId = it.find('.title_img').attr('href').replace('/show/' , '');
	// 				links.push({ 
	// 					title,
	// 					score,
	// 					describe,
	// 					imgUrl,
	// 					caseId
	// 				});
	// 			});
	// 		}
	// 		return links;
	// 	});
	// 	process.send({result});
	// }
	
	browser.close();
	process.exit(0);

})();


// function autoScroll(page) {
// 	return page.evaluate(() => {
// 		return new Promise((resolve,) => {
// 			var totalHeight = 0;
// 			var distance = 100;
// 			var timer = setInterval(() => {
// 				var scrollHeight = document.body.scrollHeight;
// 				window.scrollBy(0, distance);
// 				totalHeight += distance;
// 				if (totalHeight >= scrollHeight) {
// 					clearInterval(timer);
// 					resolve();
// 				}
// 			}, 100);
// 		});
// 	});
// }

