#!/usr/bin/env node

var args = process.argv.slice(2);

var path = require('path');
var fs = require('fs');
var glob = require('glob');

var testsDirectoryPath = path.join(__dirname, '../build/html/');
var testFilePaths = glob.sync(testsDirectoryPath + '/test-*.html');

// var htmlFilePath = path.join(__dirname,'../build/html/test-basic.html');


for (var i = 0; i < testFilePaths.length; i++) {
  var testFilePath = testFilePaths[i];
  var spawnArgs = [testFilePath].concat(args);
  var spawn = require('child_process').spawnSync;
  spawn('mocha-phantomjs', spawnArgs, { stdio: 'inherit' });
}
