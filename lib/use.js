module.exports = function (version, define) {
  'use strict';
  var fs = require('fs');
  var d = define || require('./define');
  var exists = fs.existsSync(d.dirname.typescript);
  var list_files = [];

  if (!exists) fs.mkdirSync(d.dirname.typescript);

  list_files = fs.readdirSync(d.dirname.typescript);
  list_files = list_files.filter(function (element) {
    return (element.match(/^\./) === null);
  });

  var has = list_files.indexOf('v' + version);
  if (has === -1) {
    console.log('Version: ' + version + ' has not found.');
  } else {
    exists = fs.existsSync(d.dirname.current);
    if (exists) fs.unlinkSync(d.dirname.current);
    fs.symlinkSync(d.dirname.typescript + 'v' + version, d.dirname.current);
    console.log('Using v' + version);
  }
  return true;
};
