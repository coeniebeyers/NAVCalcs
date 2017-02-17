var expect = require('expect.js');
var bitfinexClient = require('../bitfinexClient.js');

describe('bitfinexClient', function() {
  this.timeout(60000);
  it('should be able to get balance', function(done) {
    bitfinexClient.GetBalance(function(balance){
      console.log('balance:', balance.marginBalance);
      expect(balance).to.not.be(null);
      //expect(balance.marginBalance).to.be.a('number');
      done();
    });
  });
});
