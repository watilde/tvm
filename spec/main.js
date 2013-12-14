(function () {
  'use strict';
  var define = require('./define');
  var assert = require('assert');
  var tvm    = require('../tvm');

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
