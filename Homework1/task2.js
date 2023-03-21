const csv = require('csvtojson');
const fs = require('fs');

const csvFilePath = './csv/nodejs-hm1-ex1.csv';
const readStream = fs.createReadStream(csvFilePath);
stream = fs.createWriteStream('nodejs-h1-ex2.txt');

readStream
	.pipe(csv())
	.on('data', (data) => stream.write(data))
	.on('error', (err) => {
		console.log(err);
	});
