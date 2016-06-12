var db = require("./db");

exports.getAll = function (req, res){
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  db.Ricetta.find(function (err, ricettas) {
    if (err) return myutil.createResp(err, null, res);
    myutil.createResp (null, ricettas, res);
  })
};

exports.putEl = function (req, res){
  try{
    if (!db.connected) return myutil.createResp("Db disconnected", null, res);
    var obj = req.body;
    var ricetta1  = new db.Ricetta(obj);

    ricetta1.save(function (err) {
      if (err) return myutil.createResp(err, null, res);
      myutil.createResp (null, JSON.stringify (ricetta1), res);
    });
  }catch(err) {
    myutil.createResp(err, null, res);
  }
}

// TODO get ricetta che contiene almeno uno degli ingredienti in input
// l'ordine dev'essere che più l'insieme coincide, meglio è
