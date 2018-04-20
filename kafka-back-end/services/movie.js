var mongoose = require('mongoose');
var Movie= require('../schemas/movies');
var pool = require('./../pool');

function handle_request(msg, callback){

    var res = {
        statusCode:200,
        message:""
    };

    if(msg.type =='getMovieDetail'){
      pool.getConnection(function(err, connection){
         connection.query("select * from movies where movie_id = "+msg.data ,function(err,rows){
           connection.release();//release the connection
           if(err) {
              res.code = "500";
              data = {success: false,message: "Cannot get Movie. Some internal error occured!"};
              res.value = data;
              callback(null, res);
            }
            if(rows!=undefined && rows.length>0) {
              data = {success: false,message: "Movie fetched successfully",movie : rows[0]};
              res.code = "200";
              res.value = data;
              callback(null, res);
            }
            else{
              data = {success: false,message: "Movie does not exist"};
              res.code = "400";
              res.value = data;
              callback(null, res);
            }
         });
      })

    }

    if(msg.type=='store_movie'){
    var movie = msg.movie;
    var result = new Movie(movie);
            result.save(function (err) {
                if (err) throw err;
            });
            console.log(result);
            res.success = true;
            res.message = result;

    callback(null, res);
    }
    if(msg.type=='add_review'){
        Movie.findById(msg.movie_id,function(err,movie){
            if(err) throw err;
            if(movie){
                movie.reviews.push(msg.review);
                movie.save((err)=>{
                    if(err) throw err;
                    res.success = true;
                    res.message = "Review Saved!";
                    callback(null, res);
                });
            }
        });
    }
}

exports.handle_request = handle_request;
