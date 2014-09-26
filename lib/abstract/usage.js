module.exports = function (done) {
  'use strict';
  var async = require('async');

  async.waterfall([function (callback) {
    var message = '';

    message += 'Usage:\n';
    message += '    tvm usage                  Show this message\n';
    message += '    tvm list                   List installed versions\n';
    message += '    tvm list known             List registry versions\n';
    message += '    tvm install <version>      Install a version\n';
    message += '    tvm install latest         Install a latest version\n';
    message += '    tvm use <version>          Use <version>\n';
    message += '    tvm tsc <file>             Compile <file>\n';
    message += '    tvm uninstall <version>    Uninstall a version\n';
    message += '    tvm clean                  Remove all source files\n';
    message += '\ne.g.\n';
    message += '    // Install a specific version number\n';
    message += '    tvm install 0.9.5\n';
    message += '    // Use a specific version number\n';
    message += '    tvm use v0.9.5\n';
    message += '    // Let\'s compile\n';
    message += '    tvm tsc foo.ts\n';

    console.log(message);
    if (typeof done === 'function') done();
  }]);
};
