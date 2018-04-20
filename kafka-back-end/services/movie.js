var mongoose = require('mongoose');
var Movie= require('../schemas/movies');
var pool = require('./../pool');

function handle_request(msg, callback){

    var res = {
        statusCode:200,
        message:""
    };

    if(msg.type =='getMoviewDetail'){

      pool.getConnection(function(err, connection){
         connection.query("i",function(err,results,field){
           connection.release();//release the connection
           if(err) {
              res.status(500).send({success:false,message :'Cannot get Movie. Some internal error occured!', cause :err});
            }else{
              res.status(200).send({success: true,message :"New project posted " ,projectid:results.insertId});
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
