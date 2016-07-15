module.exports = function (done) {
  'use strict';
  var async   = require('async');
  var url     = require('../config/url').npm;

  // http.get method cannot reach anywhere behind proxy.
  // use 'request' module instead of 'http' module.
  // (ofcourse, passing the appropriate options, http.get method also works.)
  var request = require('request');

  async.waterfall([function (callback) {
    console.log('Searching...\n');
    callback(null);
  }, function (callback) {
    request.get({
        url: url,
        json: true
      }, function(error, response, body) {
        // something error
        if(error){
          throw error;
        }
        // bad status code
        if(response.statusCode!==200){
          throw new Error("Error: Server responsed status code " + response.statusCode + ". abort.");
        }
        // missing "versions" field
        if(!body.versions){
          throw new Error("Error: Unexpected data. abort.");
        }
        callback(null, body);
    });
  }, function (data, callback) {
    var versions = Object.keys(data.versions);
    var stdout = '';
    versions.forEach(function (version) {
      stdout += 'v' + version + '\n';
    });
    callback(null, stdout);
  }, function (data) {
    console.log(data);
    if (typeof done === 'function') done();
  }]);
};
