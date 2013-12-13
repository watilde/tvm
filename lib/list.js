module.exports = function (define) {
  'use strict';
  var fs = require('fs');
  var d = define || require('./define');
  var exists = fs.existsSync(d.dirname.typescript);
  var files  = [];
  var current = '';
  var list   = '';

  if (!exists) fs.mkdirSync(d.dirname.typescript);

  files = fs.readdirSync(d.dirname.typescript);
  files = files.filter(function (element) {
    return (element.match(/^\./) === null);
  });

  files.forEach(function (file) {
    list += file + '\n';
  });

  exists = fs.existsSync(d.dirname.current);
  if (exists) {
    current = 'v' + require(d.dirname.current + '/package.json').version;
    list += '\n';
    list += '\u001b[35m';
    list += 'current: ' + current;
  }

  if (list === '') list = 'List is empty now.';

  console.log(list);
};
