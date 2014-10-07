'use strict';

// Require absurd and mergetrees to make the magic happen
var absurd = require('./index');
var mergeTrees = require('broccoli-merge-trees');

// Make a tree for both html and css files which are spilt into different directories
// as else absurd will try compile needless files wasting processing time
var htmlTree = 'test/pages';
var cssTree = 'test/styles';

// Create some options to pass into absurd when parsing the js files to turn into CSS
var htmlOptions = {
  morph: 'html', // Need to set it to morph to HTML
  data: { // Data to be put into the html
    name: 'Daniel Beauchamp'
  },
  minify: true, // False by default in absurd, here for example
  root: __dirname // Set the root else it will import the file with relative pathing.
};

// Create some options to pass into absurd when parsing the js files to turn into CSS
var cssOptions = {
  morph: false, // Default is CSS
  minify: true,
  root: __dirname
};
// See more options on the absurdjs website/github linked in the README.md

// Htmlify the javascript files.
htmlTree = absurd(htmlTree, htmlOptions);
// Cssify the javascript files.
cssTree = absurd(cssTree, cssOptions);

// Export the joint tree made by merging the htmlTree and cssTree
module.exports = mergeTrees([htmlTree, cssTree]);
