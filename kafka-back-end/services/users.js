var mongoose = require('mongoose');
var Billing= require('../schemas/billing');
let User = require('../schemas/users');

function handle_request(msg, callback){

    var res = {
        statusCode:200,
        message:""
    };

    console.log(msg);
    if(msg.type == "get_user"){
    var user_id = msg.user_id;
    User.findById(user_id,function(err,user){
        if(err) throw err;
        if(user){
            console.log(user);
            res.success = true;
            res.message = user;
            callback(null, res);
        }
    });
            
    }
}

exports.handle_request = handle_request;