var normalizedPath = require("path").join(__dirname);

const exportData = {}

require("fs").readdirSync(normalizedPath).forEach(function(file) {
	if (file.indexOf('js') != -1)
		return

	var name = file
	console.log(`[System] Problem Loaded: ${name}`)

	exportData[name] = require('./' + file)
});

module.exports = exportData