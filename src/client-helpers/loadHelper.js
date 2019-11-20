const fs = require('fs');
const path = require('path');

module.exports = (name) => {
	const fullPath = path.join(__dirname, name);
	const exists = fs.existsSync(fullPath);

	if (!exists) return '';
	else return fs.readFileSync(fullPath, 'utf8');
};
