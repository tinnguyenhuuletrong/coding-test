const spawn = require('child_process').spawn;

function listAllFiles(absolutePath) {
	return require("fs").readdirSync(absolutePath).map(function (file) {
		return file
	});
}


function spawnProcess(absolutePath, args, timeoutMs = 1000, engine = 'exe') {
	return new Promise((resolve, reject) => {

		const start = new Date();

		if (engine == 'node' || engine == 'python') {
			args.unshift(absolutePath)
			absolutePath = engine;
		}

		const cat = spawn(absolutePath, args, {
			timeout: timeoutMs
		});

		const watcher = setTimeout(function () {
			cat.kill()
		}, timeoutMs);

		let buffer = ''
		let logBuffer = ''
		
		cat.stdout.on('data', function (data) {
			buffer += data.toString();
		});

		cat.stderr.on('data', function (data) {
			logBuffer += data.toString();
		})

		cat.on('exit', (code, signal) => {
			clearTimeout(watcher)
			const hrend = new Date() - start;
			if (code == 0) {
				resolve({
					output: buffer,
					log: logBuffer,
					timeMs: hrend
				})
			} else
				reject(new Error(`Program exit with code: ${code}`))
		});

		cat.on('error', (err) => {
			clearTimeout(watcher)
			reject(err)
		})
	})
}

module.exports.listAllFiles = listAllFiles;
module.exports.spawnProcess = spawnProcess;