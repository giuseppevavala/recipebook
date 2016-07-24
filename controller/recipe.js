var db = require("../db");
var queryString = require('query-string');

exports.getAll = function (req, res){
  logger.info (req.method + " " + req.path);
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  db.Recipe.find(function (err, recipes) {
    if (err) return myutil.createResp(err, null, res);
    myutil.createResp (null, recipes, res);
  })
};

exports.getAllIngredients = function (req, res){
  // TODO con l'aumentare di richieste si deve rendere più efficente
  logger.info (req.method + " " + req.path);
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);
  db.Recipe.find(function (err, recipes) {
    if (err) return myutil.createResp(err, null, res);

    var ingredients = [];
    recipes.forEach (function (recipe){
      ingredients = arrayUnique (ingredients.concat (recipe.ingredients));
    });

    myutil.createResp (null, ingredients, res);
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

exports.findRecipe = function (req, res){
  if (!db.connected) return myutil.createResp("Db disconnected", null, res);

  try{
    logger.info (req.method + " " + req.path);
    var query = queryString.parse(req.params.query);
    logger.debug (query);

    //patch of queryString
    if (typeof query.ingredients == 'string') query.ingredients = [query.ingredients];

    db.Recipe.find({'ingredients': {$in: query.ingredients}}, function (err, recipes) {
      if (err) return myutil.createResp(err, null, res);
      myutil.createResp (null, recipes, res);
    });
  }catch(err) {
    myutil.createResp(err, null, res);
  }
}

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
