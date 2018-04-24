//var mongoURL = "mongodb://localhost:27017/fandango";
var ObjectID = require('mongodb').ObjectID;
var mongo = require("./mongo");
var auth = require('passport-local-authenticate');
let User = require('../schemas/users');
let bcrypt =  require('bcrypt');
var pool = require('./../pool');

function handle_request(msg,callback){
    var res = {};

    // console.log('in login kafka',msg);
    // res.code=200;
    // res.value = {username: "abc"};
    // console.log("*********************************" + msg.user.username);
    // callback(null,res);

    var query = "select * from users where password = '" + msg.user.password + "' and ( email = '" + msg.user.username + "' or username = '" + msg.user.username +  "')"
    console.log(query);
    pool.getConnection(function(err, connection){
        connection.query(query,function(err,rows){
            console.log(rows);
            connection.release();//release the connection
            if(err) {
                console.log(err);
                res.code = "500";
                data = {success: false,message: "Cannot Log In. Some internal error occured!"};
                res.value = data;
                callback(null, res);
            }
            if(rows!=undefined && rows.length> 0 ) {
                console.log("***************" + rows[0].user_id);
                var data = {success: true, message: "Login successfully", userDetails: rows[0]};
                res.code = "200";
                res.value = data;
                callback(null, res);
            }
            else{
                console.log("Inside Log");
                data = {success: false,message: "Username or password is incorrect"};
                res.code = "400";
                res.value = data;
                callback(null, res);
            }
        });
    })
};

exports.handle_request = handle_request;
