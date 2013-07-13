var buster = require("buster");
buster.spec.expose();

var async = require("async");
var tvm = require("../bin/tvm.js");


describe("list known:", function () {
  before(function () {
    this.tvm = new tvm();
  });

  it("list registry versions", function (done) {
    this.timeout = 2000;
    async.waterfall([
      tvm.registry.data,
      function (data) {
        var versions = Object.keys(data.versions);
        assert.isArray(versions);
        done();
      }
    ]);
  });
});
