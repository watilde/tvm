module.exports = function () {
  'use strict';
  var http = require('http');
  var async = require('async');
  var url = 'http://registry.npmjs.org/typescript/';

  async.waterfall([function (callback) {
    console.log('Searching...\n');
    callback(null);
  }, function (callback) {
    http.get(url, function (response) {
      var data= '';
      response.setEncoding('utf8');
      response.on('data', function (line) {
        data += line;
      }).on('end', function () {
        callback(null, data);
      });
    }).on('error', function (Exeption) {
      throw new Error(Exeption);
    });
  }, function (data, callback) {
    var data = JSON.parse(data);
    var versions = Object.keys(data.versions);
    var stdout = '';
    versions.forEach(function (version) {
      stdout += 'v' + version + '\n';
    });
    callback(null, stdout);
  }, function (data) {
    console.log(data);
  }]);
};
