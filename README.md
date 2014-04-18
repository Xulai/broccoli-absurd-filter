broccoli-absurd-filter
===========

[![Build Status](https://travis-ci.org/xulai/broccoli-absurd-filter.png?branch=master)](https://travis-ci.org/xulai/broccoli-absurd-filter)

## Information

<table>
<tr>
<td>Package</td><td>broccoli-absurd-filter</td>
</tr>
<tr>
<td>Description</td>
<td>AbsurdJS plugin for Broccoli using broccoli-filter</td>
</tr>
</table>

More information about the CSS and HTML preprocessor AbsurdJS can be found at [https://github.com/krasimir/absurd](https://github.com/krasimir/absurd).
Whereas information about Broccoli which is the building asset pipeline this is for can be found at [https://github.com/joliss/broccoli](https://github.com/joliss/broccoli)

## Install

```javascript
npm install broccoli-absurd-filter
```

## Usage

Example from the included test Brocfile.js

```javascript
'use strict';

// Require absurd and mergetrees to make the magic happen
var absurd = require('./index');
var mergeTrees = require('broccoli-merge-trees')

// Make a tree for both html and css files which are spilt into different directories
// as else absurd will try compile needless files wasting processing time
var htmlTree = 'test/pages'
var cssTree = 'test/styles';

// Create some options to pass into absurd when parsing the js files to turn into CSS
var htmlOptions = {
  morph: 'html', // Need to set it to morph to HTML
  data: { // Data to be put into the html
    name: 'Daniel Beauchamp'
  },
  minify: true // False by default in absurd, here for example
};

// Create some options to pass into absurd when parsing the js files to turn into CSS
var cssOptions = {
  morph: false, // Default is CSS
  minify: true
};
// See more options on the absurdjs website/github linked below

// Htmlify the javascript files.
htmlTree = absurd(htmlTree, htmlOptions);
// Cssify the javascript files.
cssTree = absurd(cssTree, cssOptions);

// Export the joint tree made by merging the htmlTree and cssTree
module.exports = mergeTrees([htmlTree, cssTree]);
};
```

## Options

The object which is sent to the module is directly passed to AbsurdJS. So, for more information about the specific options check [https://github.com/krasimir/absurd](https://github.com/krasimir/absurd)

## Tests

```
> npm install -g broccoli-cli
> npm install -g mocha
> npm test
```
Or
```
> npm install -g broccoli-cli
> npm install -g mocha
> broccoli build temp
> mocha
```
