var db = require("../db");

exports.getAll = function (req, res){
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  db.Recipe.find(function (err, recipes) {
    if (err) return myutil.createResp(err, null, res);
    myutil.createResp (null, recipes, res);
  })
};

exports.putEl = function (req, res){
  logger.debug (req.text);
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  try{
    var obj = req.body;
    var recipe  = new db.Recipe(obj);

    recipe.save(function (err) {
      if (err) return myutil.createResp(err, null, res);
      myutil.createResp (null, recipe, res);
    });
  }catch(err) {
    myutil.createResp(err, null, res);
  }
}