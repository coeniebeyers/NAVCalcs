
function sat2BTC(value){
  var satoshisPerBTC = 0.00000001;
  return value*satoshisPerBTC;
}

exports.Sat2BTC = sat2BTC;
