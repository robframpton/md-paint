'use strict';

var electron = require('electron');
var fs = require('fs');
var highlight = require('highlight.js');
var marked = require('marked');
var minimist = require('minimist');
var path = require('path');

var renderer = require('../js/renderer.js');

var remote = electron.remote;
var sh = electron.shell;

var mdPrettyProperties = remote.getCurrentWindow().mdPrettyProperties;

var CWD = process.cwd();

var contentElement;

marked.setOptions({
	highlight: function (code) {
		return highlight.highlightAuto(code).value;
	},
	renderer: renderer
});

document.addEventListener('DOMContentLoaded', function(event) {
	contentElement = document.getElementById('content');

	startMdWatch(mdPrettyProperties.filePath);
});

document.addEventListener('click', function(event) {
	var target = event.target;

	event.preventDefault();

	var href = target.getAttribute('href');

	if (href) {
		sh.openExternal(href);
	}
});

function renderMd(filePath) {
	var fileContents = fs.readFileSync(filePath, {
		encoding: 'utf8'
	});

	process.chdir(path.dirname(filePath));

	contentElement.innerHTML = marked(fileContents);

	process.chdir(CWD);
}

function startMdWatch(filePath) {
	renderMd(filePath);

	fs.watch(filePath, function() {
		renderMd(filePath);
	});
}
