// TODO get recipe che contiene almeno uno degli ingredienti in input
// l'ordine dev'essere che più l'insieme coincide, meglio è
/**
 * Module dependencies.
 */
require("./myutil");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var recipe = require ("./controller/recipe");
var image = require ("./controller/image");
var bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer({ dest: '/tmp/image' })


app.use(bodyParser());
// Entry Point
app.get('/recipes', recipe.getAll);
app.get('/recipe/:id', recipe.getEl);
app.post('/recipe', recipe.putEl);

app.get('/images', image.getAll);
app.get('/image/:id', image.getEl);
app.post('/image', upload.single('imageFile'), image.putEl);

// Server listen
http.listen(7000, function(){
  logger.info('listening on *:7000');
});
