const probAdd = require('../problems/add')
const path = require("path");

const DEFAULT_INPUT_EXE = 'add/addError.exe'
probAdd(path.join(__dirname, '../sample/', DEFAULT_INPUT_EXE))
	.then(res => {
		console.log(res)
	})