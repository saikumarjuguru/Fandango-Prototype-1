var kafka = require('./kafka/client');
var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();

router.post('/',function(req,res){
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let useroremail = req.body.email;
    let phone_number = req.body.phone_number;
    let password = req.body.pwd;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.pwd, salt, function(err, hash) {
            password = hash;
            console.log(password);
            payload = {
             action: 'register',
                user : {
                    "first_name": first_name,
                    "last_name": last_name,
                    "useroremail": useroremail,
                    "phone_number": phone_number,
                    "password": password
                }
             }
            kafka.make_request('requestTopic',payload, function(err,results){
                console.log('in result');
                console.log(results);
                if(err){
                    throw err;
                }
                else
                {
                    console.log(results);
                    res.send(results);   
                }
            });
        });
    });
});

module.exports = router;


