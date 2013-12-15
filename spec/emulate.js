(function () {
  'use strict';
  var assert = require('assert');
  var tvm    = require('../lib/tvm');

  describe('tvm', function() {
    this.timeout(5000);
    before(function(done) {
      tvm.clean(done);
    });

    it('show usage', function(done) {
      tvm.usage(done);
    });

    it('show list known', function(done) {
      tvm.list_known(done);
    });

    it('install latest', function(done) {
      tvm.install('0.9.5', done);
    });

    it('show list', function(done) {
      tvm.list(done);
    });

    it('use latest', function(done) {
      tvm.use('0.9.5', done);
    });

    it('show list for display current', function(done) {
      tvm.list(done);
    });

    it('uninstall latest before', function(done) {
      tvm.uninstall('0.9.5', done);
    });

    it('show list check uninstall latest', function(done) {
      tvm.list(done);
    });

    after(function(done) {
      tvm.clean(done);
    });
  });
}());
