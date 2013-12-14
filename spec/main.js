(function () {
  'use strict';
  var define     = require('./define');
  var assert     = require('assert');
  var tvm        = function () {};
  tvm.usage      = require('../lib/usage');
  tvm.list       = require('../lib/list');
  tvm.list_known = require('../lib/list_known');
  tvm.install    = require('../lib/install');
  tvm.uninstall  = require('../lib/uninstall');
  tvm.use        = require('../lib/use');
  tvm.tsc        = require('../lib/tsc');
  tvm.clean      = require('../lib/clean');

  describe('tvm', function() {
    it('usage', function() {
        assert(tvm.usage());
    });
    it('list_known', function() {
        assert(tvm.list_known());
    });
    it('install', function() {
        assert(tvm.install('0.9.0'));
        assert(tvm.install('0.9.5'));
    });
    it('use', function() {
        assert(tvm.use('0.9.5'));
    });
    it('list', function() {
        assert(tvm.list());
    });
    it('uninstall', function() {
        assert(tvm.uninstall('0.9.0'));
    });
    it('list', function() {
        assert(tvm.list());
    });
    it('clean', function() {
        assert(tvm.clean());
    });
  });

}());
