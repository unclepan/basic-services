const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');
const request = require('request');
const mkdir =require('./mkdir');


const sleep = time => new Promise(resolve => {
	setTimeout(resolve, time);
});


const domImg = (htmlimg,filePath, html, headimgKey,author,code ) => new Promise(resolve => {
	let counter = 0; 
	const t = setInterval(()=>{
		if(counter<htmlimg.length){
			const matches = /.*\.(jpe?g|png|svg|gif)$/.exec(htmlimg[counter]);
			if (matches && (matches.length === 2)) {
				const extension = matches[1];
				let timestamp = Date.now();//时间戳
				html = download(htmlimg[counter],`${filePath}/${code}`, timestamp, extension, html );
			}
		} else{
			clearInterval(t);
			// process.send({content:html,imgUrl:headimgKey,author});
			resolve({imgUrl:headimgKey,author,code,content:html,});
		}
		counter +=1;
	},6000);
});

const gotoPage = async (url, page, code)=>{
	await page.goto(url);
	await page.waitFor(10000);
  
	const myDate = new Date();
	const filePath = myDate.getFullYear()+ '' + myDate.getMonth()+ '' + myDate.getDate();
	mkdir(`./images/${filePath}/${code}`);
  
	let html = await page.$eval('.entry-content', e => e.outerHTML);

	const featuredImage =  await page.$eval('.entry-header .featured-image', e => e.src);
	const matchesa = /.*\.(jpe?g|png|svg|gif)$/.exec(featuredImage);
	const extension = matchesa[1];
	const headimgKey = headimg(featuredImage,`${filePath}/${code}`,extension);

	const author =  await page.$eval('.entry-header .entry-subtitle', e => e.textContent);
	await sleep(2000);
  
	const htmlimg = await page.$$eval('.entry-content .sow-image-container img', els => Array.from(els).map(el=> el.src));
	const data = await domImg(htmlimg,filePath, html, headimgKey,author ,code);
	process.send(data);
	
};


(async () => {
	const arrs = process.argv.slice(2);
	console.log( process.argv.slice(2));
	
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setViewport({ width: 1280, height: 936 });


	for(let i = 0; i<arrs.length; i++){
		await gotoPage(`http://www.voicer.me/archives/${arrs[i]}/`, page, arrs[i]);
	}

	await browser.close();
})();




function download(url,filePath ,timestamp, extension, html){
	const a = html.replace(`${url}`, `/${filePath}/${timestamp}.${extension}`);
	request.head(url, function(){
		request(url).pipe(fs.createWriteStream(path.join(__dirname, `./images/${filePath}/${timestamp}.${extension}`)));
	});
	return a;
}


function headimg(url,filePath,extension){
	const timestamp = Date.now();//时间戳
	request.head(url, function(){
		request(url).pipe(fs.createWriteStream(path.join(__dirname, `./images/${filePath}/${timestamp}.${extension}`)));
	});
	return `${timestamp}.${extension}`;
}


