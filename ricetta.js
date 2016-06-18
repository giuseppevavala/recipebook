var db = require("./db");

exports.getAll = function (req, res){
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  db.Ricetta.find(function (err, ricettas) {
    if (err) return myutil.createResp(err, null, res);
    myutil.createResp (null, ricettas, res);
  })
};

exports.putEl = function (req, res){
  logger.debug (req.text);
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  try{
    var obj = req.body;
    var ricetta  = new db.Ricetta(obj);

    ricetta.save(function (err) {
      if (err) return myutil.createResp(err, null, res);
      myutil.createResp (null, JSON.stringify (ricetta), res);
    });
  }catch(err) {
    myutil.createResp(err, null, res);
  }
}
