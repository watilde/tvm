(function () {
  'use strict';
  var define = require('./define');
  var assert = require('assert');
  var tvm    = require('../lib/tvm');

  describe('tvm', function() {
    it('usage', function() {
        assert(tvm.usage(define));
    });
    it('list_known', function() {
        assert(tvm.list_known(define));
    });
    it('install', function() {
        assert(tvm.install('0.9.0', define));
        assert(tvm.install('0.9.5', define));
    });
    it('use', function() {
        assert(tvm.use('0.9.5', define));
    });
    it('list', function() {
        assert(tvm.list(define));
    });
    it('uninstall', function() {
        assert(tvm.uninstall('0.9.0', define));
    });
    it('list', function() {
        assert(tvm.list(define));
    });
    it('clean', function() {
        assert(tvm.clean(define));
    });
  });

}());
