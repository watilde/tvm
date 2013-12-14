module.exports = function (version) {
  'use strict';
  var async         = require('async');
  var child_process = require('child_process');
  var fs            = require('fs');
  var dirname       = require('./config/dirname');

  async.waterfall([function (callback) {
    var exists = fs.existsSync(dirname.typescript + 'v' + version);
    if (!exists) {
      console.log(version +' is not installed.');
      return;
    } else {
      callback(null, dirname.typescript + 'v' + version);
    }
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
    callback(null, dirname.src + 'v' + version);
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
    console.log('\nDone');
  }]);
  return true;
};
