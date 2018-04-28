var mongoose = require('mongoose');
var PageClicksLog= require('../schemas/pageclickslog');
var MovieClicksLog = require('../schemas/movieclickslog');

function handle_request(msg, callback){

    var res = {
        statusCode:200,
        message:""
    };

    console.log(msg);
    if(msg.type=='page_click') {
        var body = msg.body;

        PageClicksLog.update({page: body.page}, {$inc: {clicks: 1}},{upsert: true}, function (err, page) {
            if (err) throw err;
            if (page) {
                console.log(page);
                res.success = true;
                res.message = "Updated";
                callback(null,res);
            }

        });
    }
    if(msg.type=='movie_click') {
        var body = msg.body;

        MovieClicksLog.update({title: body.title}, {$inc: {clicks: 1}},{upsert: true}, function (err, page) {
            if (err) throw err;
            if (page) {
                console.log(page);
                res.success = true;
                res.message = "Updated";
                callback(null,res);
            }

        });
    }

}

exports.handle_request = handle_request;
