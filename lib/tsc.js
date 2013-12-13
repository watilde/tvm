module.exports = function (option, define) {
  'use strict';
  var fs = require('fs');
  var child_process = require('child_process');
  var define = define || require('./define');
  var dirname_current = define.dirname.current;
  var exists = fs.existsSync(dirname_current);
  if (!exists) {
    console.log('tvm use <version>');
    return;
  }
  var command = 'node ' + dirname_current + '/bin/tsc';
  if (option !== null) command += ' ' + option;

  child_process.exec(command, function (error, stdout) {
    if (error) {
      console.log(error);
    } else {
      console.log(stdout);
    }
  });
};
