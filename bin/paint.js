#!/usr/bin/env node

var mdPaint = require('../index.js');
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2));

var filePath = argv._[0];

if (!filePath) {
	process.stdout.write('Please enter a file path');

	return;
}

mdPaint(filePath);