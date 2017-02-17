var async = require('async');

var config = require('./config.js');
var util = require('./util.js');
// Data sources
var bitmex = require('./bitmexClient.js');
var counterparty = require('./counterpartyClient.js');
var bitx = require('./bitxClient.js');
var bitfinex = require('./bitfinexClient.js');

var NAV = ['bitmex', 'bitfinex'];
var UnitsInNAV = ['counterparty'];

var btcusd = 1011;

function run(){
  async.parallel({
    bitfinex: function(cb){
      var USDBalance = 71.55141002;
      bitfinex.GetLastPrice(function(lastPrice){
        var BTCEquivalent = Number((USDBalance/lastPrice).toFixed(8));
        btcusd = lastPrice;
        cb(null, BTCEquivalent);
      });
    },
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
    },
    BTCZAR: function(cb){
      bitx.GetBTCZARPrice(function(BTCZARPrice){
        cb(null, BTCZARPrice); 
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
    var BTCZAR = results.BTCZAR;
    var NAVperUnitZAR = NAVperUnitBTC*BTCZAR;
    var NAVPerUnit = {
      BTC: Number(NAVperUnitBTC.toFixed(8)),
      USD: Number((NAVperUnitBTC*btcusd).toFixed(8)),
      ZAR: Number(NAVperUnitZAR.toFixed(8)),
      timestamp: new Date().getTime(),
      BTCUSD: btcusd,
      BTCZAR: BTCZAR
    }
    console.log(NAVPerUnit);    
  }); 
}

run();
