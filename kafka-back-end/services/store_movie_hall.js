var mongoose = require('mongoose');
var MovieHall= require('../schemas/movie_halls');

function handle_request(msg, callback){

    var res = {
        statusCode:200,
        message:""
    };

    console.log(msg);
    var movie_hall = msg.movie_hall;
    var result = new MovieHall(movie_hall);
            result.save(function (err) {
                if (err) throw err;
            });
            console.log(result);
            res.success = true;
            res.message = result;
    callback(null, res);
}

exports.handle_request = handle_request;