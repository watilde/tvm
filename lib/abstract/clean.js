module.exports = function (done) {
  'use strict';
  var async         = require('async');
  var child_process = require('child_process');
  var fs            = require('fs');
  var dirname       = require('../config/dirname');

  async.waterfall([function (callback) {
    console.log('Cleaning...');
    callback(null);
  }, function (callback) {
    callback(null, dirname.typescript + '*');
  },function (path, callback) {
    var command = 'rm -rf ' + path;
    child_process.exec(command, function (error, stdout) {
      if (error) {
        console.log(error);
      } else {
        callback(null);
      }
    });
  }, function (callback) {
    callback(null, dirname.src + '*');
  }, function (path, callback) {
    var command = 'rm -rf ' + path;
    child_process.exec(command, function (error, stdout) {
      if (error) {
        console.log(error);
      } else {
        callback(null);
      }
    });
    try {
      var lstat = fs.lstatSync(dirname.current);
      if (lstat.isSymbolicLink()) fs.unlinkSync(dirname.current);
    } catch (Exception) {}
  }, function (callback) {
    console.log('\nDone');
    if (typeof done === 'function') done();
  }]);
  return true;
};

