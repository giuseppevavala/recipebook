var fs = require ('fs');
var chai = require('chai'),
  expect = chai.expect;
var request = require('supertest');
require('it-each')();

var ricetta1  = {
  nome: 'Pollo e Patate al forno',
  ingredienti: ['pollo', 'patate', 'rosmarino', 'pane grattuggiato'],
  procedimento: 'Mettere in una teglia il pollo e le patate, spolverare con pane grattuggiato, aggiungere il rosmarino, girare e mettere in forno a 220 gradi per 20 minuti'
};

request = request('http://localhost:7000');


describe('Test base', function() {
  var numElementIniziale = -1;
  this.timeout(10000);

  it('Should list existing element', function(done) {
    request.get('/ricettas')
      .expect(200)
      .end(function(err, res) {
        var resp = JSON.parse(res.text);

        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res).to.have.property('body');
        expect(resp).to.have.property('status');
        expect(resp.status).to.be.equal('ok');
        expect(resp).to.have.property('value');
        expect(resp.value).to.be.instanceof(Array);

        numElementIniziale = resp.value.length;
        done();
      });
  })

  it('Should put new element', function(done) {
    request.post('/ricetta')
      .set('Content-Type',  'application/json')
      .send (ricetta1)
      .expect(200)
      .end(function(err, res) {
        var resp = JSON.parse(res.text);

        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res).to.have.property('body');
        expect(resp).to.have.property('status');
        expect(resp.status).to.be.equal('ok');
        expect(resp).to.have.property('value');

        done();
      });
  })


  it('Should list existing element and check elements number', function(done) {
    request.get('/ricettas')
      .expect(200)
      .end(function(err, res) {
        var resp = JSON.parse(res.text);

        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res).to.have.property('body');
        expect(resp).to.have.property('status');
        expect(resp.status).to.be.equal('ok');
        expect(resp).to.have.property('value');
        expect(resp.value).to.be.instanceof(Array);
        expect(resp.value.length).to.be.equal(numElementIniziale+1) ;

        done();
      });
  })

});
