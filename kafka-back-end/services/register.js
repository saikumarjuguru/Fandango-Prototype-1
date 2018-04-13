var mongoose = require('mongoose');
var User = require('../schemas/users');

function handle_request(msg, callback){

    var res = {};
    console.log(msg);
    var user = msg.user;
    var result = new User(user);
            result.save(function (err) {
                if (err) throw err;
            });
            console.log(result);
            res = result;
    callback(null, res);
}

exports.handle_request = handle_request;