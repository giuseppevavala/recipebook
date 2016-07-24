var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var RecipeSchema = mongoose.Schema({
  name: String,
  ingredients: Array,
  procedure: String,
  image: mongoose.Schema.Types.ObjectId
});

var ImageSchema = mongoose.Schema({
  path: String,
  filename: String
});

var RecipeModel = mongoose.model('Recipe', RecipeSchema);
var ImageModel = mongoose.model('Image', ImageSchema);

exports.connected = false;
mongoose.connection
.on('error', console.error.bind(console, 'DB connection error:'))
.once('open', function() {
  logger.info ("Database loaded");

  exports.Recipe = RecipeModel;
  exports.Image = ImageModel;
  exports.connected = true;
})
.on('disconnected', function () {
  exports.connected = false;
  logger.info('Mongoose disconnected');
});

// var recipe1  = new Recipe({
//   nome: 'Pollo e Patate al forno',
//   ingredienti: ['pollo', 'patate', 'rosmarino', 'pane grattuggiato'],
//   procedimento: 'Mettere in una teglia il pollo e le patate, spolverare con pane grattuggiato, aggiungere il rosmarino, girare e mettere in forno a 220 gradi per 20 minuti'
// });

// recipe1.save(function (err) {
//   if (err) return console.log(err);
//   console.log('Recipe salvata');
// });
//
// Recipe.find(function (err, recipes) {
//   if (err) return console.error(err);
//   recipes.forEach(function(recipe){
//     console.log(recipe);
//   })
// })
//
