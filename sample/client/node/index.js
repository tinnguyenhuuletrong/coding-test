const myConsole = require('./beautyConsole.js')
var fs = require("fs");
var request = require("request");

const INPUT_FILE = process.env.INPUT_PATH || './test/add.exe'
const SERVER_DOMAIN = process.env.SERVER_DOMAIN || 'localhost'
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'http://localhost:3001/doTest/'
const PROBLEM_ID = process.env.PROBLEM_ID || 'add'

process.env['no_proxy'] = SERVER_DOMAIN;

var options = {
	method: 'POST',
	url: `${SERVER_BASE_URL}${PROBLEM_ID}`,
	headers: {
		'postman-token': 'a8824bdb-edde-1221-1a37-7978771df7ed',
		'cache-control': 'no-cache',
		'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
	},
	formData: {
		input: {
			value: `fs.createReadStream("${INPUT_FILE}")`,
			options: {
				filename: `${INPUT_FILE}`,
				contentType: null
			}
		}
	}
};

request(options, function(error, response, body) {
	if (error) throw new Error(error);

	myConsole.log(body);
});