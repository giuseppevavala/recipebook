var db = require("../db");

exports.getAll = function (req, res){
  logger.info (req.method + " " + req.path);
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  db.Image.find(function (err, images) {
    if (err) return myutil.createResp(err, null, res);
    myutil.createResp (null, images, res);
  })
};

exports.getEl = function (req, res){
  logger.info (req.method + " " + req.path);
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  db.Image.find({_id: req.params.id}, function (err, images) {
    if (err) return myutil.createResp(err, null, res);
    if (images.length == 0) return myutil.createResp(new Error("Id not found"), null, res);
    myutil.createResp (null, images[0], res);
  })
};

exports.putEl = function (req, res){
  logger.info (req.method + " " + req.path);
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  try{
    console.dir (req.file);
    var image  = new db.Image({
        path: req.file.path,
        filename: req.file.filename
    });

    image.save(function (err) {
      if (err) return myutil.createResp(err, null, res);
      myutil.createResp (null, image, res);
    });
  }catch(err) {
    myutil.createResp(err, null, res);
  }
}
