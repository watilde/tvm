module.exports = function (version, define) {
  'use strict';
  var fs = require('fs');
  var child_process = require('child_process');
  var async = require('async');
  var define = define || require('./define');
  var dirname_typescript = define.dirname.typescript;
  var dirname_src = define.dirname.src;

  async.waterfall([function (callback) {
    var exists = fs.existsSync(dirname_typescript + 'v' + version);
    if (!exists) {
      console.log(version +' is not installed.');
      return;
    } else {
      callback(null, dirname_typescript + 'v' + version);
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
    callback(null, dirname_src + 'v' + version);
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
};
