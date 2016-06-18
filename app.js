// TODO get ricetta che contiene almeno uno degli ingredienti in input
// l'ordine dev'essere che più l'insieme coincide, meglio è
// TODO API per le immagini
// TODO Creare la cartella controller
/**
 * Module dependencies.
 */
require("./myutil");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var ricetta = require ("./ricetta");
var bodyParser = require('body-parser');

app.use(bodyParser());
// Entry Point
app.get('/ricettas', ricetta.getAll);
app.post('/ricetta', ricetta.putEl);

// Server listen
http.listen(7000, function(){
  logger.info('listening on *:7000');
});
