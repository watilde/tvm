module.exports = function (done) {
  'use strict';
  var async         = require('async');
  var child_process = require('child_process');
  var fs            = require('fs');
  var request       = require('request');
  var dirname       = require('../config/dirname');
  var url           = require('../config/url').npm;
  var version       = '';

  async.waterfall([function (callback) {
    console.log('Searching...');
    request.get({
      url: url,
      json: true
    }, function (error, response, body) {
      // something error
      if (error) {
        throw error;
      }
      // bad status code
      if(response.statusCode !== 200){
        throw new Error("Error: Server responsed status code " + response.statusCode + ". abort.");
      }
      callback(null, body);
    });
  }, function (data, callback) {
    var versions = Object.keys(data.versions);
    version = String(versions[versions.length - 1]);
    var tarball = data.versions[version].dist.tarball;
    var exists = fs.existsSync(dirname.typescript + 'v' + version);
    if (exists) {
      console.log('\nv' + version + ' is already installed.');
      if (typeof done === 'function') done();
    } else {
      console.log('Now installing v' + version);
      callback(null, tarball);
    }
  }, function (tarball, callback) {
    request.get({
      url: tarball,
      binary: true
    }, function (error, response, body) {
      // something error
      if (error) {
        throw error;
      }
      // bad status code
      if(response.statusCode !== 200){
        throw new Error("Error: Server responsed status code " + response.statusCode + ". abort.");
      }
      callback(null, body);
    });
  }, function (data, callback) {
    var exists = fs.existsSync(dirname.src);
    if(!exists) fs.mkdirSync(dirname.src);
    var file_name = dirname.src + 'v' + version + '/typescript-' + version + '.tgz';
    fs.mkdirSync(dirname.src + 'v' + version);
    fs.openSync(file_name, 'w+');
    var writeStream = fs.createWriteStream(file_name);
    writeStream.on('error', function (exception) {
      throw exception;
    });
    writeStream.on('close', function () {
      var name = dirname.src + 'v' + version,
      path = name + '/typescript-' + version + '.tgz';
      callback(null, path, name);
    });
    writeStream.write(data, 'binary');
    writeStream.end();
  }, function (path, name, callback) {
    var command = 'tar -zxf ' + path + ' -C ' + name;
    child_process.exec(command, function (error, stdout) {
      if (error) {
        console.log(error);
      } else {
        callback(null);
      }
    });
  }, function (callback) {
    var path = dirname.src + 'v' + version + '/';
    var old_path = path + 'package';
    var new_path = path + 'typescript-' + version;
    fs.renameSync(old_path, new_path);
    old_path = path + 'typescript-' + version;
    new_path = dirname.typescript + 'v' + version;
    callback(null, old_path, new_path);
  }, function (old_path, new_path, callback) {
    var command = 'cp -r ' + old_path + ' ' + new_path;
    var exists = fs.existsSync(dirname.typescript);
    if(!exists) fs.mkdirSync(dirname.typescript);
    child_process.exec(command, function (error, stdout) {
      if (error) {
        console.log(error);
      } else {
        callback(null);
      }
    });
  }, function () {
    console.log('\nDone');
    if (typeof done === 'function') done();
  }]);
  return true;
};
