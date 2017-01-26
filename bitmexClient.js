var SwaggerClient = require("swagger-client");
var _ = require('lodash');
var BitMEXAPIKeyAuthorization = require('./lib/BitMEXAPIKeyAuthorization');
var config = require('./config.js');

var sat2BTC = 0.00000001;

function getBalance(cb){
  new SwaggerClient({
    url: 'https://www.bitmex.com/api/explorer/swagger.json',
    usePromise: true
  })
  .then(function(client) {
    client.clientAuthorizations.add(
      "apiKey", 
      new BitMEXAPIKeyAuthorization(
        config.apiKey, 
        config.apiSecret
      )
    );

    client.User.User_getMargin()
    .then(function(response){
      var margin = JSON.parse(response.data.toString());
      cb(margin);
    })
    .catch(function(e) {
      console.log('Error:', e);
      cb(0);
    });
  })
  .catch(function(e) {
    console.error("Unable to connect:", e);
    cb(0);
  })
}

getBalance(function(balance){
  console.log('balance:', balance.marginBalance*sat2BTC);
});
