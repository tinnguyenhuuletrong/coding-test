
// Since [nodePath, jsPath] is 0 and 2
const inputLen = process.argv.length - 2
if (inputLen != 2)
    return console.log('-1');
const inputs = process.argv.slice(2);

function logMessage() {
    console.warn.call(null, ...arguments);
}

// Your Logic here
const a = parseInt(inputs[0]);
const b = parseInt(inputs[1]);

logMessage('my log here. just in cases!')

// Output here
console.log(a + b)