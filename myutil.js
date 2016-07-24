var Log = require ('log')

var createResp = function (err, value, res){
  if (err){
    var resp = {status: 'error', value: err.toString()};
    logger.error (resp);
  }else{
    var resp = {status: 'ok', value: value};
    logger.debug (resp);
  }
  res.status(200).send(resp).end();
}

global.logger = new Log("INFO");
global.myutil = {createResp: createResp};
global.MY_IMAGE_DIR = "/tmp/image";
