'use strict';
var Filter = require('broccoli-filter');

function absurdFilter(inputTree, options) {

  if(!(this instanceof absurdFilter)) {
    return new absurdFilter(inputTree, options);
  }

  this.absurd = require('absurd')();

  this.options = options || {};

  this.inputTree = inputTree;
}

absurdFilter.prototype = Object.create(Filter.prototype);
absurdFilter.prototype.constructor = absurdFilter;

absurdFilter.prototype.extensions = ['js', 'json', 'yaml', 'yml', 'css'];

absurdFilter.prototype.processString = function(str, file) {
  var fileNamePath;
  var compiledResult;
  var root = this.options.root;

  if(root){
    fileNamePath  = root + '/' + this.inputTree + '/' + file;
  } else {
   fileNamePath = '../../' + this.inputTree + '/' + file;
  }

  this.absurd.flush();

  this.targetExtension = 'css';

  if(this.options.morph) {
    this.absurd.morph(this.options.morph);
    if(this.options.morph == 'jsonify'){
      this.targetExtension = 'json';
    } else {
      this.targetExtension = this.options.morph;
    }
  }

  return this.absurd.import(fileNamePath).compile(this.options);
};

module.exports = absurdFilter;
