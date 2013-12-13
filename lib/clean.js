module.exports = function (define) {
  'use strict';
  var async = require('async');
  var child_process = require('child_process');
  var d = define || require('./define');

  async.waterfall([function (callback) {
    console.log('Cleaning...');
    callback(null);
  }, function (callback) {
    callback(null, d.dirname.typescript + '*');
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
    callback(null, d.dirname.src + '*');
  }, function (path, callback) {
    var command = 'rm -rf ' + path;
    child_process.exec(command, function (error, stdout) {
      if (error) {
        console.log(error);
      } else {
        callback(null);
      }
    });
  }, function (callback) {
    console.log('\nDone');
  }]);
};

