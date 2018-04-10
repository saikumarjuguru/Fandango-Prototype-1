var mongoURL = "mongodb://localhost:27017/fandango";
var ObjectID = require('mongodb').ObjectID;
var mongo = require("./mongo");
var auth = require('passport-local-authenticate');

function handle_request(msg,callback){
    var res = {};
    console.log(msg);
    if(msg.key === 'login'){
        if(msg.value.username == "sricheta@gamil.com" && msg.value.password =="abc"){
            res.code = "200";
            data = {  username : msg.username};
            res.value = data;
        }
       else{
           res.code = "401";
           data = {  message : "Failed Login"};
           res.value = data;
       }
       callback(null, res);
  }
}

exports.handle_request = handle_request;
