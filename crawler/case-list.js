const puppeteer = require('puppeteer');
const url = 'https://creative.adquan.com/';

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
	await page.goto(url, { // 跳转到 https://example.com/
		waitUntil:'networkidle2'
	});
	await sleep(5000);
	await page.waitForSelector('.downloadMore1');

	let result;
	for (let i = 0; i < 30; i++) {
		await page.click('.downloadMore1');
		await sleep(6000);
		result = await page.evaluate(() => {
			var $ = window.$;
			var items = $('.w_l_inner_case_more li').slice(-12);
			var links = [];
			if(items.length >= 1) {
				items.each((index, item) => {
					let it = $(item);
					let title = it.find('.mian_text_title a').text();
					let score = it.find('.num_ping:eq(0)').text();
					let describe = it.find('.title_img div span').text();
					let imgUrl = it.find('.title_img img').attr('src');
					let caseId = it.find('.title_img').attr('href').replace('/show/' , '');
					links.push({ 
						title,
						score,
						describe,
						imgUrl,
						caseId
					});
				});
			}
			return links;
		});
		process.send({result});
	}
	
	browser.close();
	process.exit(0);

})();

