var mongoose = require('mongoose');
var PageClicksLog= require('../schemas/pageclickslog');
var MovieClicksLog = require('../schemas/movieclickslog');
var UserTrace = require('../schemas/usertrace');
var ComponentClicksLog = require('../schemas/componentclicklog');
var mongo = require("./mongo");
var mongoURL = "mongodb://fan:123@ds115352.mlab.com:15352/fandango";

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

    if(msg.type=='component_click') {
        console.log("Inside component clicks");

        var body = msg.body;

        console.log(msg.body);
        ComponentClicksLog.update({component: body.component}, {$inc: {clicks: 1}},{upsert: true}, function (err, page) {
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

    if(msg.type=='user_trace') {
        console.log("Inside user trace");
        var body = msg.body;
        console.log("body",body);

        if(body.path == "login") {
            console.log(body.user);
            var result = new UserTrace(body);
            result.save(function(err) {
               if(err)  throw error;
                console.log(body);
                res.success = true;
                res.message = body.user;
                callback(null, res);

            });
        }
        else {
                UserTrace.find({user_id: msg.body.user_id}, function (err, trace) {
                    if (err) throw err;
                    if (trace) {

                        console.log("trace path : "  + trace[0].path);
                        console.log("msg body paht " + msg.body.path);
                        trace[0].path.push(msg.body.path);
                        trace[0].save((err) => {
                            if (err) throw err;
                            console.log(trace);
                            res.message =msg.body.user;
                            res.success = true;
                            callback(null, res);
                        });
                    }
                }).sort({"created":-1});

        }
    }


}

exports.handle_request = handle_request;
