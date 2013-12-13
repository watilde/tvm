module.exports = function () {
  var async = require('async');
  var child_process = require('child_process');
  var dirname_typescript = __dirname + '/../typescript/';
  var dirname_src = __dirname + '/../src/';

  async.waterfall([function (callback) {
    console.log('Cleaning...');
    callback(null);
  }, function (callback) {
    callback(null, dirname_typescript + '*');
  },function (path, callback) {
    var command = 'rm -rf ' + path;
    child_process.exec(command, function (error, stdout) {
      if (error) {
        console.log(error);
      } else {
        callback(null);
      }
    });
  }, function (callback) {
    callback(null, dirname_src + '*');
  }, function (path, callback) {
    var command = 'rm -rf ' + path;
    child_process.exec(command, function (error, stdout) {
      if (error) {
        console.log(error);
      } else {
        callback(null);
      }
    });
  }, function (callback) {
    console.log('\nDone');
  }]);
};

