var async = require('async');

var config = require('./config.js');
var util = require('./util.js');
var bitmex = require('./bitmexClient.js');
var counterparty = require('./counterpartyClient.js');

var NAV = ['bitmex'];
var UnitsInNAV = ['counterparty'];

function run(){
  async.parallel({
    bitmex: function(cb){
      bitmex.GetBalance(function(balance){
        var marginBalance = util.Sat2BTC(balance.marginBalance);
        marginBalance = Number(marginBalance.toFixed(8));
        cb(null, marginBalance);
      });
    },
    counterparty: function(cb){
      counterparty.GetBalances(function(balances){
        var sumOfUnits = 0;
        for(var i in balances.data){
          var item = balances.data[i];
          if(item.address != config.counterpartyIssuerAddress){
            sumOfUnits += Number(item.balance);
          }
        }
        sumOfUnits = Number(sumOfUnits.toFixed(8));
        cb(null, sumOfUnits);
      });
    }
  }, function(err, results){
    if(err){console.log('ERROR:', err);}
    var btcNAV = 0;
    for(var j in NAV){
      var navItem = NAV[j];
      btcNAV += results[navItem];
    }
    var unitsInNAV = 0;
    for(var k in UnitsInNAV){
      var unitItem = UnitsInNAV[k];
      unitsInNAV += results[unitItem];
    }
    var NAVperUnitBTC = Number((btcNAV/unitsInNAV).toFixed(8));
    console.log('NAV per unit:', NAVperUnitBTC + 'BTC');    
  }); 
}

run();
