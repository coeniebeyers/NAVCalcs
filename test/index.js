var expect = require('expect.js'),
    navcalcs = require('..');

describe('navcalcs', function() {
  it('should say hello', function(done) {
    expect(navcalcs()).to.equal('Hello, world');
    done();
  });
});
