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

var arrayUnique = function (array) {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i] === a[j])
              a.splice(j--, 1);
      }
  }

  return a;
}


global.arrayUnique = arrayUnique;
global.logger = new Log("INFO");
global.myutil = {createResp: createResp};
global.MY_IMAGE_DIR = "/tmp/image";
