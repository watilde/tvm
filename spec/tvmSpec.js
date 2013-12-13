var buster = require("buster");
buster.spec.expose();

var async = require("async");
var list_known = require(__dirname + '/../lib/list_known');

describe("list known:", function () {
  it("list registry versions", function () {
    buster.assert.equals(true, true);
  });
});
