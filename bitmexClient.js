var SwaggerClient = require("swagger-client");
var _ = require('lodash');
var BitMEXAPIKeyAuthorization = require('./lib/BitMEXAPIKeyAuthorization');
var config = require('./config.js');

function getBalance(cb){
  new SwaggerClient({
    url: 'https://www.bitmex.com/api/explorer/swagger.json',
    usePromise: true
  })
  .then(function(client) {
    client.clientAuthorizations.add(
      "apiKey", 
      new BitMEXAPIKeyAuthorization(
        config.bitmexApiKey, 
        config.bitmexApiSecret
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

exports.GetBalance = getBalance;
