var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var RicettaSchema = mongoose.Schema({
  nome: String,
  ingredienti: Array,
  procedimento: String,
  image: mongoose.Schema.Types.ObjectId
});

var ImageSchema = mongoose.Schema({
  path: String,
  fileName: String
});

var RicettaModel = mongoose.model('Ricetta', RicettaSchema);
var ImageModel = mongoose.model('Image', ImageSchema);

exports.connected = false;
mongoose.connection
.on('error', console.error.bind(console, 'DB connection error:'))
.once('open', function() {
  logger.info ("Database loaded");

  exports.Ricetta = RicettaModel;
  exports.Image = ImageModel;
  exports.connected = true;
})
.on('disconnected', function () {
  exports.connected = false;
  logger.info('Mongoose disconnected');
});

// var ricetta1  = new Ricetta({
//   nome: 'Pollo e Patate al forno',
//   ingredienti: ['pollo', 'patate', 'rosmarino', 'pane grattuggiato'],
//   procedimento: 'Mettere in una teglia il pollo e le patate, spolverare con pane grattuggiato, aggiungere il rosmarino, girare e mettere in forno a 220 gradi per 20 minuti'
// });

// ricetta1.save(function (err) {
//   if (err) return console.log(err);
//   console.log('Ricetta salvata');
// });
//
// Ricetta.find(function (err, ricettas) {
//   if (err) return console.error(err);
//   ricettas.forEach(function(ricetta){
//     console.log(ricetta);
//   })
// })
//
