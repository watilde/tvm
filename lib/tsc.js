module.exports = function (option) {
  'use strict';
  var fs            = require('fs');
  var child_process = require('child_process');
  var dirname       = require('./config/dirname');
  var exists        = fs.existsSync(dirname.current);

  if (!exists) {
    console.log('tvm use <version>');
    return;
  }

  var command = 'node ' + dirname.current + '/bin/tsc';
  if (option !== null) command += ' ' + option;

  child_process.exec(command, function (error, stdout) {
    if (error) {
      console.log(error);
    } else {
      console.log(stdout);
    }
  });
};
