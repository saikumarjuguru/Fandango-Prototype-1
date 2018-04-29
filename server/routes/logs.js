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


router.post('/component_click', function(req, res, next) {
    console.log(req.body);
    payload = {
        action:"logging",
        type:"component_click",
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

router.post('/user_journey', function(req, res, next) {

    console.log("11111111111111111111111111");

    payload = {
        action:"logging",
        type:"user_trace",
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
        }
    });
});

module.exports = router;
