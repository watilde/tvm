module.exports = function (version, done) {
  'use strict';
  var async   = require('async');
  var fs      = require('fs');
  var dirname = require('../config/dirname');

  async.waterfall([function (callback) {
    var exists     = fs.existsSync(dirname.typescript);
    var list_files = [];

    if (!exists) fs.mkdirSync(dirname.typescript);

    list_files = fs.readdirSync(dirname.typescript);
    list_files = list_files.filter(function (element) {
      return (element.match(/^\./) === null);
    });

    var has = list_files.indexOf('v' + version);
    if (has === -1) {
      console.log('Version: ' + version + ' has not found.');
    } else {
      exists = fs.existsSync(dirname.current);
      if (exists) fs.unlinkSync(dirname.current);
      fs.symlinkSync(dirname.typescript + 'v' + version, dirname.current);
      console.log('Using v' + version);
    }
    callback(null, has);
  }, function (callback, has) {
    if (typeof done === 'function') done();
  }]);
};
