var should = require('should');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var cleanupOutput = true;
var rootInputDir = 'test/';
var htmlInputDir = rootInputDir + 'pages/';
var htmlOutputDir = 'temp/';
var cssInputDir =  rootInputDir + 'styles/';
var cssOutputDir = 'temp/';

after(function() {
  if(cleanupOutput){
    rimraf.sync(htmlOutputDir);
    rimraf.sync(cssOutputDir);
  }
  rimraf.sync('tmp');
});

describe('broccoli-absurd-filter', function() {
  describe('absurd()', function() {
    var htmlfiles = fs.readdirSync(htmlInputDir);
    var cssfiles = fs.readdirSync(cssInputDir);

    for (var index in htmlfiles) {
      var fileName = htmlfiles[index];
      var fullPath = htmlInputDir + fileName;
      if (fs.lstatSync(fullPath).isDirectory()) {
        continue;
      }

      var baseName = path.basename(fileName, '.js');
      it('should compile absurdjs html ' + fileName, function() {
        var contents = fs.readFileSync(htmlOutputDir + '/' + baseName + '.css', 'utf8');

        contents.toString().should.equal(
          fs.readFileSync(rootInputDir + '/expected/' + baseName + '.css', 'utf8')
            .trim());
      });
    }

    for (var index in cssfiles) {
      var fileName = cssfiles[index];
      var fullPath = cssInputDir + fileName;
      if (fs.lstatSync(fullPath).isDirectory()) {
        continue;
      }

      var baseName = path.basename(fileName, '.js');
      it('should compile absurdjs css ' + fileName, function() {
        var contents = fs.readFileSync(cssOutputDir + '/' + baseName + '.css', 'utf8');

        contents.toString().should.equal(
          fs.readFileSync(rootInputDir + '/expected/' + baseName + '.css', 'utf8')
            .trim());
      });
    }
  });
});