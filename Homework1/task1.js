process.stdin.on('data', (data) => {
	data = data.toString().split('').reverse().join('').trim();
	process.stdout.write(data + '\n');
});
