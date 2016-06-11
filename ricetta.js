var db = require("./db");

exports.getAll = function (req, res){
  if (!db.connected) return res.status(500).end(JSON.stringify({status: "error", value: "Db disconnected"}));
  db.Ricetta.find(function (err, ricettas) {
    if (err){
      var resp = {status: 'error', value: err};
    }else{
      var resp = {status: 'ok', value: ricettas};
    }
    res.status(200).end(JSON.stringify(resp));
  })
};

// get ricetta che contiene almeno uno degli ingredienti in input
// l'ordine dev'essere che più l'insieme coincide, meglio è 
