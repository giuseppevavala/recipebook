var fs = require ('fs');
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
require('it-each')();

var recipe1  = {
  name: 'Pollo e Patate al forno',
  ingredient: ['pollo', 'patate', 'rosmarino', 'pane grattuggiato'],
  procedure: 'Mettere in una teglia il pollo e le patate, spolverare con pane grattuggiato, aggiungere il rosmarino, girare e mettere in forno a 220 gradi per 20 minuti',
  image: null
};

request = request('http://localhost:7000');


describe('Test base', function() {
  var numElementIniziale = -1;
  this.timeout(10000);

  it('Should list existing element', function(done) {
    request.get('/recipes')
      .expect(200)
      .end(function(err, res) {
        var resp = res.body;

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
  });

  it('Should post image', function(done) {
    request.post('/image')
      .attach('imageFile', './test/file/avatar.jpg')
      .expect(200)
      .end(function(err, res) {
        var resp = res.body;

        expect(err).to.be.null;
        expect(resp).to.be.a('object');
        expect(resp).to.have.property('status');
        expect(resp.status).to.be.equal('ok');

        recipe1.image = resp.value._id;

        done();
      });
  });

  it('Should put new element', function(done) {
    request.post('/recipe')
      .set('Content-Type',  'application/json')
      .send (recipe1)
      .expect(200)
      .end(function(err, res) {
        var resp = res.body;

        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res).to.have.property('body');
        expect(resp).to.have.property('status');
        expect(resp.status).to.be.equal('ok');
        expect(resp).to.have.property('value');

        recipe1._id = resp.value._id;
        Object.keys(recipe1).forEach (function (key){
          expect(resp.value[key]).to.deep.equal(recipe1[key]);
        });

        done();
      });
  })

  it('Should get element and check elements', function(done) {
    request.get('/recipe/' + recipe1._id)
      .expect(200)
      .end(function(err, res) {
        var resp = res.body;

        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res).to.have.property('body');
        expect(resp).to.have.property('status');
        expect(resp.status).to.be.equal('ok');
        expect(resp).to.have.property('value');
        expect(resp.value).to.be.an('object');

        Object.keys(recipe1).forEach (function (key){
          expect(resp.value[key]).to.deep.equal(recipe1[key]);
        });

        done();
      });
  })


  it('Should list existing element and check elements number', function(done) {
    request.get('/recipes')
      .expect(200)
      .end(function(err, res) {
        var resp = res.body;

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
