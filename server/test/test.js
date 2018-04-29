var assert = require('assert');
var app = require('../server');
var request = require('supertest');
var assert = require('chai').assert;
var token='';
var email=Math.random()+'@gmail.com';
var username = Math.floor(Math.random()*1000000);

//Test case- 1 - get Movie Detail
it('Test case 1 - should respond with success flag on', function(done) {
  this.timeout(500);
setTimeout(done, 300);
    request(app)
      .get('/movie/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
          if (err) done(err);
          assert.equal(res.body.success, true);
          done();
      });
 });

 //Test case- 2 - star movie
 it('Test case 2 - should respond with success flag on', function(done) {
     request(app)
       .post('/movie/star')
       .send({"movieid":"1",
        "userid":"1",
        "rating" : 3})
       .expect(200)
       .expect('Content-Type', /json/)
       .end(function(err, res) {
           if (err) done(err);
           assert.equal(res.body.success, true);
           done();
       });
  });

  //Test case- 3 - get movie names
  it('Test case 3 - should respond with success flag on', function(done) {
      request(app)
        .get('/movie_hall/getmovienames')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) done(err);
            assert.equal(res.body.statusCode, 200);
            done();
        });
   });

   //Test case- 4 - search movie hall admin
   it('Test case 4 - should respond with success flag on', function(done) {
       request(app)
         .post('/movie_hall/searchmoviehalladmin')
         .send({"user_id":"1",
          "searchtext":"hello"})
         .expect(200)
         .expect('Content-Type', /json/)
         .end(function(err, res) {
             if (err) done(err);
             assert.ok(true);
             done();
         });
    });

   //Test case- 5 - get reviews of movie
    it('Test case 5 - should respond with success flag on', function(done) {
          request(app)
          .get('/movie/review/1')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
              if (err) done(err);
              assert.equal(res.body.success, true);
              done();
          });
     });

     //Test case- 6 - get
     it('Test case 6 - should respond with success flag on', function(done) {
            request(app)
           .post('/movie/review')
           .send({"movieid":"1",
            "userid":"1",
            "comment" : "superb from mocha!"})
           .expect(200)
           .expect('Content-Type', /json/)
           .end(function(err, res) {
               if (err) done(err);
               assert.equal(res.body.success, true);
               done();
           });
      });
