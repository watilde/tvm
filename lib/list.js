module.exports = function () {
  'use strict';
  var fs = require('fs');
  var dirname_typescript = __dirname + '/../typescript/';
  var exists = fs.existsSync(dirname_typescript);
  var files  = [];
  var list   = '';

  if (!exists) fs.mkdirSync(dirname_typescript);

  files = fs.readdirSync(dirname_typescript);
  files = files.filter(function (element) {
    return (element.match(/^\./) === null);
  });

  files.forEach(function (file) {
    list += file + '\n';
  });

  if (list === '') list = 'List is empty now.';

  console.log(list);
};
