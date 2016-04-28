'use strict';

var electron = require('electron-prebuilt');
var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');

function mdPaint(filePath) {
	filePath = resolveFilePath(filePath);

	validatePath(filePath, function(err) {
		if (err) {
			throw err;
		}

		var appPath = path.join(__dirname, 'app.js');

		var child = childProcess.spawn(electron, [appPath, '--filePath', filePath]);

		child.stdin.pipe(process.stdin);
		child.stdout.pipe(process.stdout);
	});
}

function resolveFilePath(initialPath) {
	if (path.isAbsolute(initialPath)) {
		return initialPath;
	}
	else {
		return path.join(process.cwd(), initialPath);
	}
}

function validatePath(filePath, cb) {
	fs.stat(filePath, function(err, stats) {
		if (err) {
			throw err;
		}
		else if (!stats.isFile()) {
			err = new Error('Not a valid file');
		}

		cb(err);
	});
}

module.exports = mdPaint;
