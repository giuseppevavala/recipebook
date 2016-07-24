var chai = require('chai'),
	expect = chai.expect;

var request = require('supertest');

request = request('http://localhost:7000');
var imageId = null;
var numberOfImages = -1;

describe('Image', function() {
	this.timeout(5000);

	it('Should get all images', function(done) {
    request.get('/images')
			.attach('imageFile', './test/file/avatar.jpg')
      .expect(200)
      .end(function(err, res) {
        var resp = res.body;

				expect(err).to.be.null;
				expect(resp).to.be.a('object');
				expect(resp).to.have.property('status');
				expect(resp.status).to.be.equal('ok');
				expect(resp).to.have.property('value');
				expect(resp.value).to.be.a('Array');

				numberOfImages = resp.value.length;

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

				imageId = resp.value._id;

        done();
      });
  });

	it('Should get element', function(done) {
		request.get('/image/' + imageId)
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
				expect(resp.value._id).to.be.equal(imageId);


				done();
			});
	})


	it('Should get all images', function(done) {
    request.get('/images')
			.attach('imageFile', './test/file/avatar.jpg')
      .expect(200)
      .end(function(err, res) {
        var resp = res.body;

				expect(err).to.be.null;
				expect(resp).to.be.a('object');
				expect(resp).to.have.property('status');
				expect(resp.status).to.be.equal('ok');
				expect(resp).to.have.property('value');
				expect(resp.value).to.be.a('Array');
				expect(resp.value.length).to.be.equal (numberOfImages+1);
				numberOfImages = numberOfImages + 1;

        done();
      });
  });
});
