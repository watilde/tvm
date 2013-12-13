/**
 * tvm
 * TypeScript version manager
 *
 * @author  Daijiro Wachi <daijiro.wachi@gmail.com>
 * @url     https://github.com/watilde/tvm
 * @version 0.0.1
 */

"use strict";


var http = require('http'),
  fs = require('fs'),
  async = require('async');

var argv = process.argv;

/**
 * Directory || File shortcuts
 * @type {{
 *   src: string,
 *   src_v: string,
 *   ts: string,
 *   ts_v: string,
 *   current: string
 * }}
 */
var dir = {
  src:  __dirname + '/../src/',
  src_v:  __dirname + '/../src/v',
  ts: __dirname + '/../typescript/',
  ts_v:  __dirname + '/../typescript/v',
  current:  __dirname + '/../current'
};

/**
 * Command shortcuts
 * @type {{
 *   exec: Function,
 *   cp: Function,
 *   rm_rf: Function,
 *   tar: Function,
 *   tsc: Function
 * }}
 */
var command = {
  exec: require('child_process').exec,
  cp: function (oldPath, newPath, callback) {
    var cmd = 'cp -r ' + oldPath + ' ' + newPath;
    command.exec(cmd, function (err, stdout) {
      if (err) {
        console.log(err);
      } else {
        callback(null);
      }
    });
  },
  rm_rf: function (path, callback) {
    var cmd = 'rm -rf ' + path;
    command.exec(cmd, function (err, stdout) {
      if (err) {
        console.log(err);
      } else {
        callback(null);
      }
    });
  },
  tar: function (path, name, callback) {
    var cmd = 'tar -zxf ' + path + ' -C ' + name;
    command.exec(cmd, function (err, stdout) {
      if (err) {
        console.log(err);
      } else {
        callback(null);
      }
    });
  },
  tsc: function (option) {
    var exists = fs.existsSync(dir.current);
    if (!exists) {
      console.log('tvm use <version>');
      return;
    }
    var cmd = 'node ' + dir.current + '/bin/tsc';
    if (option != null) {
      cmd += ' ' + option;
    }
    command.exec(cmd, function (err, stdout) {
      if (err) {
        console.log(err);
      } else {
        console.log(stdout);
      }
    });
  }
};

/**
 * Registry data
 * @type {{
 *   url: string,
 *   data: Function
 * }}
 */
var registry = {
  url: 'http://registry.npmjs.org/typescript/',
  data: function (callback) {
    http.get(registry.url, function(res) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function(str) {
        data += str;
      }).on('end', function() {
          callback(null, JSON.parse(data));
        });
    });
  }
};

/**
 * List registry versions
 * @type {{
 *   init: Function,
 *   result: Function,
 *   exec: Function
 * }}
 */
var list_known = {
  init: function (callback) {
    console.log('Searching...\n');
    callback(null);
  },
  result: function (data) {
    var versions = Object.keys(data.versions);
    versions.forEach(function (version) {
      console.log('v' + version);
    });
  },
  exec: function () {
    async.waterfall([
      this.init,
      registry.data,
      this.result
    ]);
  }
};

/**
 * List installed versions
 * @type {{files: Function, exec: Function}}
 */
var list = {
  files: (function () {
    var exists = fs.existsSync(dir.ts);
    if(!exists) fs.mkdirSync(dir.ts);
    var files = fs.readdirSync(dir.ts);
    files = files.filter(function (element, index, array) {
      return (element.match(/^\./) == null);
    });
    return files;
  }()),
  exec: function () {
    list.files.forEach(function (v) {
      console.log(v);
    });
  }
};

/**
 * Use <version>
 * @param version
 */
var use = function (version) {
  var has = list.files.indexOf('v' + version);
  if (has === -1) {
    console.log('Version: ' + version + ' has not found.');
  } else {
    var exists = fs.existsSync(dir.current);
    if (exists) fs.unlinkSync(dir.current);
    fs.symlinkSync(dir.ts_v + version, dir.current);
    console.log('Using v' + version);
  }
};

/**
 * Install a version
 * @param version
 */
var install = function (version) {
  async.waterfall([
    function (callback) {
      var exists = fs.existsSync(dir.ts_v + version);
      if (exists) {
        console.log('v' + version +' is already installed.');
      } else {
        console.log('Searching...');
        callback(null);
      }
    },
    registry.data,
    function (data, callback) {
      var versions = Object.keys(data.versions);
      var tarball = '';
      if (versions.indexOf(version) === -1) {
        console.log("\nUnknown typescript compiler version: '" + version + "'.");
      } else {
        tarball = data.versions[version].dist.tarball;
        callback(null, tarball);
      }
    }, function (tarball, callback) {
      http.get(tarball, function(res) {
        var data = '';
        res.setEncoding('binary')
        res.on('data', function(str) {
          data += str;
        }).on('end', function() {
            callback(null, data);
          });
      });
    }, function (data, callback) {
      var exists = fs.existsSync(dir.src);
      if(!exists) fs.mkdirSync(dir.src);
      var file_name = dir.src_v + version + '/typescript-' + version + '.tgz';
      fs.mkdirSync(dir.src_v + version);
      fs.openSync(file_name, 'w+');
      var writeStream = fs.createWriteStream(file_name);
      writeStream.on('error', function (exception) {
        throw exception;
      });
      writeStream.on('close', function () {
        var name = dir.src_v + version,
          path = name + '/typescript-' + version + '.tgz';
        callback(null, path, name);
      });
      writeStream.write(data, 'binary');
      writeStream.end();
    },
    command.tar,
    function (callback) {
      var path = dir.src_v + version + '/',
        oldPath = path + 'package',
        newPath = path + 'typescript-' + version;
      fs.renameSync(oldPath, newPath);
      oldPath = path + 'typescript-' + version,
        newPath = dir.ts_v + version;
      callback(null, oldPath, newPath);
    },
    command.cp,
    function () {
      console.log('\nDone')
    }
  ]);
};

/**
 * Uninstall a version
 * @param version
 */
var uninstall = function (version) {
  async.waterfall([
    function (callback) {
      var exists = fs.existsSync(dir.ts_v + version);
      if (!exists) {
        console.log(version +' is not installed.');
        return;
      } else {
        callback(null, dir.ts_v + version);
      }
    },
    command.rm_rf,
    function (callback) {
      callback(null, dir.src_v + version);
    },
    command.rm_rf,
    function (callback) {
      console.log('\nDone');
    }
  ]);
};

/**
 * Remove source file
 * @param version
 */
var clean = function (version) {
  async.waterfall([
    function (callback) {
        callback(null, dir.ts + '*');
    },
    command.rm_rf,
    function (callback) {
      callback(null, dir.src + '*');
    },
    command.rm_rf,
    function (callback) {
      console.log('\nDone');
    }
  ]);
};

/**
 * Help message
 */
var help = function () {
  var message = 'Usage:\n';
  message += '    tvm help                   Show this message\n';
  message += '    tvm list                   List installed versions\n';
  message += '    tvm list known             List registry versions\n';
  message += '    tvm install <version>      Install a version\n';
  message += '    tvm use <version>          Use <version>\n';
  message += '    tvm tsc <file>             Compile <file>\n';
  message += '    tvm uninstall <version>    Uninstall a version\n';
  message += '    tvm clean                  Remove source file\n';
  message += '\ne.g.\n';
  message += '    // Install a specific version number\n';
  message += '    tvm install 0.9.0\n';
  message += '    // Use a specific version number\n';
  message += '    tvm use v0.9.0\n';
  message += "    // Let's compile\n";
  message += '    tvm tsc foo.ts\n';
  console.log(message);
};

// Get command
if(argv[2]) {
  switch (argv[2]) {
    case 'usage':
      help();
      break;
    case 'help':
      help();
      break;
    case '-h':
      help();
      break;
    case 'list':
      if (argv.length === 3) list.exec();
      if (argv[3] === 'known') list_known.exec();
      break;
    case 'ls':
      if (argv.length === 3) list.exec();
      if (argv[3] === 'known') list_known.exec();
      break;
    case 'install':
      if (argv[3] != null) install(argv[3]);
      break;
    case 'uninstall':
      if (argv[3] != null) uninstall(argv[3]);
      break;
    case 'rm':
      if (argv[3] != null) uninstall(argv[3]);
      break;
    case 'use':
      if (argv[3] != null) use(argv[3]);
      break;
    case 'tsc':
      command.tsc(argv.slice(3).join().replace(/\,/g, ' '));
      break;
    case 'clean':
      if (argv.length === 3) clean();
      break;
    default:
      var message = "Unrecognized command line argument: '";
      message += argv[2];
      message += "' ( see: 'tvm usage' )";
      console.log(message);
      break;
  }
} else {
  // Spec test
  var tvm = function tvm() {};
  tvm.registry = registry;
  module.exports = tvm;
}
