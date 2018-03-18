function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

let a;
let b;
module.exports.input = function () {
	a = getRandomInt(10000) - getRandomInt(10000)
	b = getRandomInt(10000) - getRandomInt(10000)
	return [a, b]
}

module.exports.expectedOutput = function () {
	return a + b
}

module.exports.limitTimeInSec = function () {
	return 1
}

function solution(a, b) {
	return a + b;
}