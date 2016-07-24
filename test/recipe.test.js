var fs = require ('fs');
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var queryString = require('query-string');

require('it-each')();

var recipe1  = {
  name: 'Pollo e Patate al forno',
  ingredients: ['pollo', 'patate', 'rosmarino', 'pane grattuggiato'],
  procedure: 'Mettere in una teglia il pollo e le patate, spolverare con pane grattuggiato, aggiungere il rosmarino, girare e mettere in forno a 220 gradi per 20 minuti',
  image: null
};

var recipe2  = {
  name: 'Salsicce e patate fritte',
  ingredients: ['salsicce', 'patate', 'rosmarino'],
  procedure: 'Friggere le patate e intanto. Mettere la griglia sul fuoco per 10 minuti, posare le salsicce e aggiungere il rosmarino',
  image: null
};

var query = {ingredients: ['salsicce']};

request = request('http://localhost:7000');


describe('Recipes', function() {
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

  it('Should put new element 1', function(done) {
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

  it('Should put new element 2', function(done) {
    request.post('/recipe')
      .set('Content-Type',  'application/json')
      .send (recipe2)
      .expect(200)
      .end(function(err, res) {
        var resp = res.body;

        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res).to.have.property('body');
        expect(resp).to.have.property('status');
        expect(resp.status).to.be.equal('ok');
        expect(resp).to.have.property('value');

        recipe2._id = resp.value._id;
        Object.keys(recipe2).forEach (function (key){
          expect(resp.value[key]).to.deep.equal(recipe2[key]);
        });

        done();
      });
  })

  it('Find elements by ingredients', function(done) {
    request.get('/recipe/find/' + queryString.stringify(query))
      .set('Content-Type',  'application/json')
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

        done();
      });
  })

  it('Should get element 1 and check elements', function(done) {
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

  it('Should get element 2 and check elements', function(done) {
    request.get('/recipe/' + recipe2._id)
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

        Object.keys(recipe2).forEach (function (key){
          expect(resp.value[key]).to.deep.equal(recipe2[key]);
        });

        done();
      });
  })

  it('Should get all ingredients', function(done) {
    request.get('/recipes/ingredients')
      .expect(200)
      .end(function(err, res) {
        var resp = res.body;

        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res).to.have.property('body');
        expect(resp).to.have.property('status');
        expect(resp.status).to.be.equal('ok');
        expect(resp).to.have.property('value');
        expect(resp.value).to.be.an('array');

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
        expect(resp.value.length).to.be.equal(numElementIniziale+2) ;

        done();
      });
  })

});
