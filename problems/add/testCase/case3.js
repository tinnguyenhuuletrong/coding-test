function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const a = getRandomInt(10000) - getRandomInt(10000)
const b = getRandomInt(10000) - getRandomInt(10000)

module.exports.input = function () {
	return [a,b]
}

module.exports.expectedOutput = function () {
	return a + b
}

module.exports.limitTimeInSec = function () {
	return 1
}