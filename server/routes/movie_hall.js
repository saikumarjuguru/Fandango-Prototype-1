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

router.get('/getmoviehallinfo', (req, res) => {
    payload = {
        action: "movie_hall",
        type: "get_movie_hall_info",
        user_id: req.param("user_id")
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

router.get('/getrevenuebymovie', (req, res) => {
    payload = {
        action: "movie_hall",
        type: "get_revenue_by_movie",
        user_id: req.param("user_id")
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

router.get('/getuserbilldetails', (req, res) => {
    payload = {
        action: "movie_hall",
        type: "get_user_bill_details",
        user_id: req.param("user_id")
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

router.post('/canceluserbooking', (req, res) => {
    payload = {
        action: "movie_hall",
        type: "cancel_user_booking",
        billing_id: req.body.billing_id
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

router.post('/searchmoviehalladmin', (req, res) => {
    payload = {
        action: "movie_hall",
        type: "search_movie_hall_admin",
        user_id: req.body.user_id,
        searchtext: req.body.searchtext
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

router.post('/editmovieinfo', (req, res) => {
    payload = {
        action: "movie_hall",
        type: "edit_movie_info",
        movie_hall_id: req.body.movie_hall_id,
        screen_number: req.body.screen_number,
        movie_id: req.body.movie_id,
        slot1: req.body.slot1,
        slot2: req.body.slot2,
        slot3: req.body.slot3,
        slot4: req.body.slot4,
        max_seats: req.body.max_seats,
        ticket_price: req.body.ticket_price
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

router.get('/getmovienames', (req, res) => {
    payload = {
        action: "movie_hall",
        type: "get_movie_names"
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

router.get('/:movieid', (req, res) => {
    payload = {
      action: "movie_hall",
      type: "getMovieHallsAndTimes",
      data : req.params.movieid
    };

    kafka.make_request('requestTopic', payload, function(err,results){
        if(err){
         done(err,{});
         }
         else{
           console.log(results.value)
           if(results.code == 200){
              return res.status(200).json(results.value);;
            }else{
              return res.status(500).json(results.value);;
            }
         }
      });

});

router.get('/check-available-seats/:movie_id/:movie_hall_id/:slot/:seats/:date_of_movie',function(req,res){
    let payload = {
        action : 'movie_hall',
        type:'check',
        movie_id: req.params.movie_id,
        movie_hall_id: req.params.movie_hall_id,
        date_of_movie: req.params.date_of_movie,
        slot: req.params.slot,
        seats:req.params.seats
    }
    kafka.make_request('requestTopic',payload, function(err,results){
        console.log('in check available seats result');
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
