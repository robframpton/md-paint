'use strict';

var marked = require('marked');
var path = require('path');

var renderer = new marked.Renderer();

renderer.image = function(src, title, alt) {
	alt = alt || '';
	src = src || '';
	title = title || '';

	if (!path.isAbsolute(src)) {
		src = path.join(process.cwd(), src);
	}

	return '<img alt="' + alt + '" src="' + src + '" title="' + title + '" />';
};

module.exports = renderer;
