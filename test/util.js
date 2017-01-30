var expect = require('expect.js');
var util = require('../util.js');

describe('util', function() {
  this.timeout(10000);
  it('should be able to convert from satoshis to BTC', function(done) {
    var valueInSatoshi = 1000;
    var valueInBTC = util.Sat2BTC(valueInSatoshi);
    expect(valueInBTC).to.be(valueInSatoshi*0.00000001);
    done();
  });
});
