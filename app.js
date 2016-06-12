/**
 * Module dependencies.
 */
require("./myutil");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser')
var ricetta = require ("./ricetta");

// Setting environment
app.use(bodyParser.json());

// Entry Point
app.get('/ricettas', ricetta.getAll);
app.post('/ricetta', ricetta.putEl);

// Server listen
http.listen(7000, function(){
  logger.info('listening on *:7000');
});
