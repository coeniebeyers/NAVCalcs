var http = require('http');

var cpifCounterwalletAddress = '1HwUqsR5i8e5H9aPvkJtYgwYG6dd5Laht6';

function getHttpData(options, result){
  var str= '';
  http.request(options, function(response){

    response.on('data', function(chunk){
      var strChunk = ''+chunk;
      strChunk = strChunk.replace('Mastercoin (...', 'Mastercoin');
      strChunk = strChunk.replace('Global Curre...', 'Global Currency');
      strChunk = strChunk.replace('Electronic G...', 'Electronic G');
      str += strChunk;
    });

    response.on('end', function(){      
      result(JSON.parse(str));  
    });
  }).end();
}

function getCpifAssetHolders(result){
  
  var options = {
    host: 'xcp.blockscan.com',
    path: '/api2?module=asset&action=holders&name=cpif'
  };

  getHttpData(options, function(cb){
    result(cb);
  });
}

getCpifAssetHolders(function(result){
  console.log('cpifCounterwalletAddress:', result);
});
