module.exports = function () {
  'use strict';
  var fs      = require('fs');
  var dirname = require('../config/dirname');
  var exists  = fs.existsSync(dirname.typescript);
  var files   = [];
  var current = '';
  var list    = '';

  if (!exists) fs.mkdirSync(dirname.typescript);

  files = fs.readdirSync(dirname.typescript);
  files = files.filter(function (element) {
    return (element.match(/^\./) === null);
  });

  files.forEach(function (file) {
    list += file + '\n';
  });

  exists = fs.existsSync(dirname.current);
  if (exists) {
    current = 'v' + require(dirname.current + '/package.json').version;
    list += '\n';
    list += '\u001b[35m';
    list += 'current: ' + current;
  }

  if (list === '') list = 'List is empty now.';

  console.log(list);
  return true;
};
