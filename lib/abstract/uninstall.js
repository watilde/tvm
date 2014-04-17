module.exports = function (version, done) {
  'use strict';
  var async   = require('async');
  var exec    = require('child_process').exec;
  var fs      = require('fs');
  var dirname = require('../config/dirname');

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
    exec(command, function (error, stdout) {
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
    exec(command, function (error, stdout) {
      if (error) {
        console.log(error);
      } else {
        callback(null);
      }
    });
  }, function (callback) {
    console.log('\nDone');
    if (typeof done === 'function') done();
  }]);
  return true;
};
