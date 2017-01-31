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

function getBTCZARPrice(cb){
  
  var options = {
    host: 'api.mybitx.com',
    path: '/api/1/ticker?pair=XBTZAR'
  };

  getHttpsData(options, function(result){
    var lastTrade = Number(result.last_trade);
    cb(lastTrade);
  });
}

exports.GetBTCZARPrice = getBTCZARPrice;
