const fs = require("fs");
const path = require("path");
const utils = require('../../utils')
const spawn = require('child_process').spawn;
const MY_DIR = __dirname

function doIt(inputExe, engine = 'exe') {
	const AllTestCases = utils.listAllFiles(path.join(MY_DIR, 'testCase'))
	const jobs = AllTestCases.map(itm => {

		let module = require(`./testCase/${itm}`)
		if (module == null)
			return {
				name: itm,
				result: false
			}

		const args = module.input()
		const expectedOutput = module.expectedOutput()
		const limitTimeInSec = module.limitTimeInSec() * 1000

		return new Promise((resolve, reject) => {
			utils.spawnProcess(inputExe, args, limitTimeInSec, engine)
				.then(returnVal => {
					const res = returnVal.output.trim();
					const log = returnVal.log.trim();
					const timeMs = returnVal.timeMs;
					resolve({
						name: itm,
						result: expectedOutput.toString() === res.toString(),
						input: args,
						expected: expectedOutput,
						output: res,
						log: log,
						exeTimeMs: timeMs
					})

				})
				.catch(err => {
					resolve({
						name: itm,
						result: false,
						input: args,
						expected: expectedOutput,
						error: err.toString(),
						log: log,
						exeTimeMs: -1
					})
				})
		})
	})

	return Promise.all(jobs)
}

module.exports.exe = doIt
module.exports.doc = fs.readFileSync(path.join(MY_DIR, 'doc.md'), 'utf8')