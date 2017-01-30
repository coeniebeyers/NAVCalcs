var expect = require('expect.js');
var counterpartyClient = require('../counterpartyClient.js');

describe('counterpartyClient', function() {
  this.timeout(60000);
  it('should be able to get balances of token holders', function(done) {
    counterpartyClient.GetBalances(function(balances){
      //console.log('balances:', balances);
      expect(balances).to.not.be(null);
      expect(balances.data).to.not.be(null);
      expect(balances.data.length).to.be.greaterThan(0);
      done();
    });
  });
});
