var mongoose = require('mongoose');
var Movie= require('../schemas/movies');

function handle_request(msg, callback){

    var res = {
        statusCode:200,
        message:""
    };

    console.log(msg);
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

exports.handle_request = handle_request;