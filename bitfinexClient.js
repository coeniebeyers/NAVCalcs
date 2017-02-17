var https = require('https');

function getHttpsData(options, result){
  var str= '';
  https.request(options, function(response){

    response.on('data', function(chunk){
      var strChunk = ''+chunk;
      str += strChunk;
    });

    response.on('end', function(){      
      result(JSON.parse(str));  
    });
  }).end();
}

function getLastPrice(cb){
  
  var options = {
    host: 'api.bitfinex.com',
    path: '/v2/ticker/tBTCUSD'
  };

  getHttpsData(options, function(result){
    cb(result[6]);
  });
}

exports.GetLastPrice = getLastPrice;
