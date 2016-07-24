var db = require("../db");

exports.getAll = function (req, res){
  logger.info (req.method + " " + req.path);
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  db.Recipe.find(function (err, recipes) {
    if (err) return myutil.createResp(err, null, res);
    myutil.createResp (null, recipes, res);
  })
};

exports.getEl = function (req, res){
  logger.info (req.method + " " + req.path);
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  db.Recipe.find({_id: req.params.id}, function (err, recipes) {
    if (err) return myutil.createResp(err, null, res);
    if (recipes.length == 0) return myutil.createResp(new Error("Id not found"), null, res);
    myutil.createResp (null, recipes[0], res);
  })
};

exports.putEl = function (req, res){
  logger.info (req.method + " " + req.path);
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
