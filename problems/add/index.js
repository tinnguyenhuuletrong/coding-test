const path = require("path");
const utils = require('../../utils')
const spawn = require('child_process').spawn;
const MY_DIR = __dirname

function doIt(inputExe) {
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
			utils.spawnProcess(inputExe, args, limitTimeInSec)
				.then(returnVal => {
					const res = returnVal.output.trim();
					const timeMs = returnVal.timeMs;
					resolve({
						name: itm,
						result: expectedOutput.toString() === res.toString(),
						input: args,
						expected: expectedOutput,
						output: res,
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
						exeTimeMs: -1
					})
				})
		})
	})

	return Promise.all(jobs)
}

module.exports = doIt