var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');



router.post('/', function(req, res, next) {
    console.log("**************************");
    console.log(req.body);
    payload = {
        action:"logging",
        type:"page_click",
        body: req.body
    }
    kafka.make_request('requestTopic',payload, function(err,results){
        console.log('in logging result');
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

router.post('/movie_clicks', function(req, res, next) {


    payload = {
        action:"logging",
        type:"movie_click",
        body: req.body
    }
    kafka.make_request('requestTopic',payload, function(err,results){
        console.log('in logging result');
        console.log(results);
        if(err){
            throw err;
        }
        else {
            console.log(results);
            res.send(results);
            callback(null, res);
        }
    });
});

module.exports = router;
