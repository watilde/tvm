module.exports = function (option, done) {
  'use strict';
  var async         = require('async');
  var fs            = require('fs');
  var child_process = require('child_process');
  var dirname       = require('../config/dirname');

  async.waterfall([function (callback) {
    var exists        = fs.existsSync(dirname.current);
    if (!exists) {
      console.log('tvm use <version>');
      return;
    } else {
      callback(null);
    }
  }, function (callback) {
    var command = 'node ' + dirname.current + '/bin/tsc';
    if (option !== null) command += ' ' + option;

    child_process.exec(command, function (error, stdout) {
      if (error) {
        console.log(error);
      }
      console.log(stdout);

      if (typeof done === 'function') done();
    });
  }]);
};
