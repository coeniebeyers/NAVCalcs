var expect = require('expect.js');
var bitxClient = require('../bitxClient.js');

describe('bitxClient', function() {
  this.timeout(60000);
  it('should be able to get the last BTCZAR price', function(done) {
    bitxClient.GetBTCZARPrice(function(price){
      //console.log('price:', price);
      expect(price).to.not.be(null);
      expect(price).to.be.a('number');
      done();
    });
  });
});
