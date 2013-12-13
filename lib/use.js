module.exports = function (version, define) {
  'use strict';
  var fs = require('fs');
  var define = define || require('./define');
  var dirname_typescript = define.dirname.typescript;
  var dirname_current = define.dirname.current;
  var exists = fs.existsSync(dirname_typescript);
  var list_files = [];

  if (!exists) fs.mkdirSync(dirname_typescript);

  list_files = fs.readdirSync(dirname_typescript);
  list_files = list_files.filter(function (element) {
    return (element.match(/^\./) === null);
  });

  var has = list_files.indexOf('v' + version);
  if (has === -1) {
    console.log('Version: ' + version + ' has not found.');
  } else {
    exists = fs.existsSync(dirname_current);
    if (exists) fs.unlinkSync(dirname_current);
    fs.symlinkSync(dirname_typescript + 'v' + version, dirname_current);
    console.log('Using v' + version);
  }
};
