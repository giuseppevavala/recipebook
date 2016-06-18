var Log = require ('log')

var createResp = function (err, value, res){
  if (err){
    var resp = {status: 'error', value: err.toString()};
    logger.error (resp);
  }else{
    var resp = {status: 'ok', value: value};
  }
  res.status(200).end(JSON.stringify(resp));
}

global.logger = new Log("DEBUG");
global.myutil = {createResp: createResp};
