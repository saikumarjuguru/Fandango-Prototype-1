var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');

/* GET home page. */
router.post('/', function(req, res, next) {
    payload = {
        action:"movie_hall",
        type:'store_movie_hall',
        movie_hall: {
            movie_times:req.body.movie_times,
            number_of_tickets: req.body.number_of_tickets,
            screen_number: req.body.screen_number,
            ticket_price: req.body.ticket_price
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

router.put('/update/:hallID',(req,res)=>{
    payload = {
        action:"movie_hall",
        type:'update_movie_hall',
        hall_id:req.params.hallID,
        movie_hall: {
            movie_times:req.body.movie_times,
            number_of_tickets: req.body.number_of_tickets,
            screen_number: req.body.screen_number,
            ticket_price: req.body.ticket_price
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


module.exports = router;
