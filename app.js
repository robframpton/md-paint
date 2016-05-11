'use strict';

const electron = require('electron');
const minimist = require('minimist');
const path = require('path');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var argv = minimist(process.argv.slice(2));

var mainWindow = null;

app.on('window-all-closed', function() {
	app.quit();
});

app.on('ready', function() {
	mainWindow = new BrowserWindow({
		height: 800,
		width: 700
	});

	mainWindow.mdPrettyProperties = {
		filePath: argv.filePath
	};

	mainWindow.loadURL('file://' + __dirname + '/public/html/index.html');

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});
