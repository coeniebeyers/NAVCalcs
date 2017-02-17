var http = require('http');

var cpifCounterwalletAddress = '1HwUqsR5i8e5H9aPvkJtYgwYG6dd5Laht6';

function getHttpData(options, result){
  var str= '';
  http.request(options, function(response){

    response.on('data', function(chunk){
      var strChunk = ''+chunk;
      str += strChunk;
    });

    response.on('end', function(){      
      result(JSON.parse(str));  
    });
  }).end();
}

function getBalances(cb){
  
  var options = {
    host: 'xcp.blockscan.com',
    path: '/api2?module=asset&action=holders&name=cpif'
  };

  getHttpData(options, function(result){
    cb(result);
  });
}

exports.GetBalances = getBalances;
