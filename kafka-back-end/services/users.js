var mongoose = require('mongoose');
var Billing= require('../schemas/billing');
let User = require('../schemas/users');
var con = require('../pool');

function handle_request(msg, callback){
    //here statusCode is for authentication 
    var res = {
        statusCode:200,
        message:""
    };

    console.log(msg);
    if(msg.type == "get_user"){
    var user_id = msg.user_id;
    con.query('SELECT * FROM users WHERE user_id=?',[user_id],function(err,user){
        if(err) throw err;
        if(user.length>0){
            console.log(user);
            res.success = true;
            res.message = user[0];
            callback(null, res);
        }

    });
    // User.findById(user_id,function(err,user){
    //     if(err) throw err;
    //     if(user){
    //         console.log(user);
    //         res.success = true;
    //         res.message = user;
    //         callback(null, res);
    //     }
    // });
            
    }
    if(msg.type=='delete_user'){
        var user_id = msg.user_id;
        User.findByIdAndRemove(msg.user_id,function(err,user){
            if(err) {
                res.success = false;
                res.message = err;
                callback(null,res);
            } else {
                res.success = true;
                res.message = user;
                callback(null,res);
            }
        });
    }
}

exports.handle_request = handle_request;