var mongoURL = "mongodb://localhost:27017/fandango";
var ObjectID = require('mongodb').ObjectID;
var mongo = require("./mongo");
var auth = require('passport-local-authenticate');
let User = require('../schemas/users');
let bcrypt =  require('bcrypt');

function handle_request(msg,callback){
    var res = {};
//     console.log(msg);
//     if(msg.key === 'login'){
//         if(msg.value.username == "sricheta@gamil.com" && msg.value.password =="abc"){
//             res.code = "200";
//             data = {  username : msg.username};
//             res.value = data;
//         }
//        else{
//            res.code = "401";
//            data = {  message : "Failed Login"};
//            res.value = data;
//        }
//        callback(null, res);
//   }

    console.log('in login',msg);
    User.findOne({useroremail: msg.user.username}, function(err, user) {
        if(err) throw err;
        if(!user) {
            res.code =  401;
            data = {message : "Failed Login"};
            res.value = data;
          }
          bcrypt.compare(msg.user.password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch) { 
                res.code=200;
                data = {username: user.useroremail};
               
            }
            else {
                res.code =  401;
                data = {message : "Failed Login"};
                res.value = data;
            }
            
          });
          callback(null,res);
        
    });
}

exports.handle_request = handle_request;
