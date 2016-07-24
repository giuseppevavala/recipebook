// TODO get ricetta che contiene almeno uno degli ingredienti in input
// l'ordine dev'essere che più l'insieme coincide, meglio è
/**
 * Module dependencies.
 */
require("./myutil");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var ricetta = require ("./controller/ricetta");
var image = require ("./controller/image");
var bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer({ dest: '/tmp/image' })


app.use(bodyParser());
// Entry Point
app.get('/ricette', ricetta.getAll);
app.post('/ricetta', ricetta.putEl);
app.get('/images', image.getAll);
app.post('/image', upload.single('imageFile'), image.putEl);

// Server listen
http.listen(7000, function(){
  logger.info('listening on *:7000');
});
