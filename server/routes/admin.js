var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');

router.get('/getrevenuebymovie', (req, res) => {
    payload = {
        action: "admin",
        type: "get_revenue_by_movie"
    };
    kafka.make_request('requestTopic',payload, function(err,results){
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

router.get('/getrevenuebymoviehall', (req, res) => {
    payload = {
        action: "admin",
        type: "get_revenue_by_movie_hall"
    };
    kafka.make_request('requestTopic',payload, function(err,results){
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

module.exports = router;