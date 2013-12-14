module.exports = function (option, define) {
  'use strict';
  var fs = require('fs');
  var child_process = require('child_process');
  var d = define || require('./define');
  var exists = fs.existsSync(d.dirname.current);
  if (!exists) {
    console.log('tvm use <version>');
    return;
  }
  var command = 'node ' + d.dirname.current + '/bin/tsc';
  if (option !== null) command += ' ' + option;

  child_process.exec(command, function (error, stdout) {
    if (error) {
      console.log(error);
    } else {
      console.log(stdout);
    }
  });
  return true;
};
