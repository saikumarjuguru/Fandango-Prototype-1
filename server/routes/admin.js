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

router.get('/getmoviehallinfo', (req, res) => {
    payload = {
        action: "admin",
        type: "get_movie_hall_info"
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

router.post('/addmoviehall', (req, res) => {
    payload = {
        action: "admin",
        type: "add_movie_hall",
        movie_hall_name: req.body.movie_hall_name,
        ticket_price: req.body.ticket_price,
        city: req.body.city,
        max_seats: req.body.max_seats
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

router.post('/editmoviehall', (req, res) => {
    payload = {
        action: "admin",
        type: "edit_movie_hall",
        movie_hall_id: req.body.movie_hall_id,
        movie_hall_name: req.body.movie_hall_name,
        ticket_price: req.body.ticket_price,
        city: req.body.city,
        max_seats: req.body.max_seats
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
        action: "admin",
        type: "get_user_bill_details"
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

router.get('/getmoviesinhall', (req, res) => {
    payload = {
        action: "admin",
        type: "get_movies_in_hall",
        movie_hall_id: req.param("movie_hall_id")
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

router.post('/addmovie', (req, res) => {
    payload = {
        action: "admin",
        type: "add_movie",
        title: req.body.title,
        trailer_link: req.body.trailer_link,
        movie_characters: req.body.movie_characters,
        release_date: req.body.release_date,
        rating: req.body.rating,
        photos: req.body.photos,
        movie_length: req.body.movie_length,
        see_it_in: req.body.see_it_in,
        movie_type: req.body.movie_type
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

router.post('/searchmovie', (req, res) => {
    payload = {
        action: "admin",
        type: "search_movie",
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

router.post('/searchmoviehall', (req, res) => {
    payload = {
        action: "admin",
        type: "search_movie_hall",
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

router.post('/searchbillbydate', (req, res) => {
    payload = {
        action: "admin",
        type: "search_bill_by_date",
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

router.post('/searchbillbymonth', (req, res) => {
    payload = {
        action: "admin",
        type: "search_bill_by_month",
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

router.post('/editmovie', (req, res) => {
    payload = {
        action: "admin",
        type: "edit_movie",
        movie_id: req.body.movie_id,
        title: req.body.title,
        trailer_link: req.body.trailer_link,
        movie_characters: req.body.movie_characters,
        release_date: req.body.release_date,
        rating: req.body.rating,
        photos: req.body.photos,
        movie_length: req.body.movie_length,
        see_it_in: req.body.see_it_in,
        movie_type: req.body.movie_type
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

router.get('/getuserdetails', (req, res) => {
    payload = {
        action: "admin",
        type: "get_user_details"
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

router.post('/deleteuser', (req, res) => {
    payload = {
        action: "admin",
        type: "delete_user",
        user_id: req.body.user_id
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

router.get('/getmoviesgraphdata', (req, res) => {
    payload = {
        action: "admin",
        type: "get_movies_graph_data"
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

router.get('/getcitiesgraphdata', (req, res) => {
    payload = {
        action: "admin",
        type: "get_cities_graph_data"
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

router.get('/getmoviehallsgraphdata', (req, res) => {
    payload = {
        action: "admin",
        type: "get_movie_halls_graph_data"
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

router.get('/getpageclicks', (req, res) => {
    payload = {
        action: "admin",
        type: "get_page_clicks"
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