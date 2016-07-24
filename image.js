var db = require("./db");

exports.getAll = function (req, res){
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  db.Image.find(function (err, images) {
    if (err) return myutil.createResp(err, null, res);
    myutil.createResp (null, images, res);
  })
};

exports.putEl = function (req, res){
  logger.debug (req.text);
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  try{
    var image  = new db.Image({
        path: req.file.path,
        fileName: req.file.fileName
    });

    image.save(function (err) {
      if (err) return myutil.createResp(err, null, res);
      myutil.createResp (null, image, res);
    });
  }catch(err) {
    myutil.createResp(err, null, res);
  }
}
