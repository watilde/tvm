module.exports = function (version, define) {
  'use strict';
  var fs = require('fs');
  var child_process = require('child_process');
  var async = require('async');
  var d = define || require('./define');

  async.waterfall([function (callback) {
    var exists = fs.existsSync(d.dirname.typescript + 'v' + version);
    if (!exists) {
      console.log(version +' is not installed.');
      return;
    } else {
      callback(null, d.dirname.typescript + 'v' + version);
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
    callback(null, d.dirname.src + 'v' + version);
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
