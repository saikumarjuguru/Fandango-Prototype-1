var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var fs = require('fs-extra')
var passport = require('passport');
require('./passport')(passport);
var router = express.Router();
var kafka = require('./kafka/client');

router.post('/', function (req, res, next) {

    console.log("Inside Sign Up Node");
    console.log(JSON.stringify(req.body));
    payload = {
        action: 'signup',
        user:{
            email: req.body.email,
            username : req.body.username,
            password: req.body.password
        }
    }
    kafka.make_request('requestTopic',payload, function(err,results){
        if (err) {
            done(err, {});
        }
        else {
            if (results.code == 200) {
                res.status(200).json(results.value);
            }
            else {
                console.log(results.value);
                res.status(401).json(results.value);
            }
        }
    });
});

module.exports = router;