module.exports = function (define) {
  'use strict';
  var fs = require('fs');
  var define = define || require('./define');
  var dirname_typescript = define.dirname.typescript;
  var dirname_current = define.dirname.current;
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
