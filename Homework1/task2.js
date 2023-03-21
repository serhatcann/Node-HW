import csv from 'csvtojson';
import fs from 'fs';
const csvFilePath = './csv/nodejs-hm1-ex1.csv';
const readStream = fs.createReadStream(csvFilePath);
const stream = fs.createWriteStream('nodejs-h1-ex2.txt');

readStream
	.pipe(csv())
	.on('data', (data) => stream.write(data))
	.on('error', (err) => {
		console.log(err);
	});
