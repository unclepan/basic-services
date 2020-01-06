const cp = require('child_process');
const { resolve } = require('path');
const Case = require('./models/case');

exports.trailer =  async () => {
	let ids = await Case.find({imgUrl:{$exists:false},author:{$exists:false}, content:{$exists:false}});
	const lssad = ids.map(item => item.caseId);

	const script = resolve(__dirname, './case-img');
	const child = cp.fork(script,[ ...lssad]);// 派生出子进程
	let invoked = false;
	child.on('error', () => {
		if(invoked)  return;
		invoked =  true;
	});
	child.on('exit', code => {
		if(invoked)  return;
		invoked =  false;
		let err = code === 0 ? null : new Error('exit code ' + code);
		console.log(err);
	});
	child.on('message', data => {
		console.log('爬取数据',data);
		// let result = data.textArray;
		// result.forEach(async item => {
		// 	let casev = await Case.findOne({
		// 		caseId: item.caseId
		// 	});
		// 	if(!casev){
		// 		await new Case({...item}).save();
		// 	}
		// });


		Case.updateOne({'caseId':data.code},{$set:{...data}},err=>{
			console.log(err);
			console.log(11);
		});
	});
};
