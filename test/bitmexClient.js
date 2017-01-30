var expect = require('expect.js');
var bitmexClient = require('../bitmexClient.js');

describe('bitmexClient', function() {
  this.timeout(10000);
  it('should be able to get balance', function(done) {
    bitmexClient.GetBalance(function(balance){
      //console.log('balance:', balance.marginBalance);
      expect(balance).to.not.be(null);
      expect(balance.marginBalance).to.be.a('number');
      done();
    });
  });
});
