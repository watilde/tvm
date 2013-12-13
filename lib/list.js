module.exports = function () {
  'use strict';
  var fs = require('fs');
  var dirname_typescript = __dirname + '/../typescript/';
  var dirname_current = __dirname + '/../current';
  var exists = fs.existsSync(dirname_typescript);
  var files  = [];
  var current = '';
  var list   = '';

  if (!exists) fs.mkdirSync(dirname_typescript);

  files = fs.readdirSync(dirname_typescript);
  files = files.filter(function (element) {
    return (element.match(/^\./) === null);
  });

  files.forEach(function (file) {
    list += file + '\n';
  });

  exists = fs.existsSync(dirname_current);
  if (exists) {
    current = 'v' + require(dirname_current + '/package.json').version;
    list += '\n';
    list += '\u001b[35m';
    list += 'current: ' + current;
  }

  if (list === '') list = 'List is empty now.';

  console.log(list);
};
