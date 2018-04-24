var mongoose = require('mongoose');
var MovieHall= require('../schemas/movie_halls');
var conn = require('../pool');

function handle_request(msg, callback){

    var res = {
        statusCode:200,
        message:""
    };

    if(msg.type=='store_movie_hall'){
    console.log(msg);
    var movie_hall = msg.movie_hall;
    var result = new MovieHall(movie_hall);
            result.save(function (err) {
                if (err) throw err;
            });
            console.log(result);
            res.success = true;
            res.message = result;
    callback(null, res);
    }
    if(msg.type=='update_movie_hall'){
        console.log(msg);
        MovieHall.findByIdAndUpdate(msg.hall_id,msg.movie_hall,{new:true},(err,newHall)=>{
            if(err){
                res.success = false;
                res.message = err;
                callback(null, res);
            } else {
                res.success = true;
                res.message = newHall;
                callback(null, res);
            }
        });
    }
    if (msg.type === "get_movie_hall_info"){
        let query = "select movie_hall_id, user_id, screen_id, movie_hall_name, ticket_price, city, movie_id, screen_number, " +
            "slot1, slot2, slot3, slot4, max_seats, title as movie_name, see_it_in\n" +
            "from movie_hall inner join screen using (movie_hall_id) inner join movies using (movie_id)\n" +
            "where user_id = (?)";
        conn.query(query, [msg.user_id], function (err, result) {
            if (err){
                res.statusCode = 401;
                res.message = err;
                callback(err, res);
            }
            else {
                res.message = result;
                callback(null, res);
            }
        });
    }
    if (msg.type === "get_revenue_by_movie"){
        let query = "select movie_id, movie_name, ifnull(revenue, 0) as revenue from\n" +
            "(select distinct movie_id, title as movie_name from screen inner join movies using (movie_id)\n" +
            "where movie_hall_id in (select distinct movie_hall_id from movie_hall where user_id = ?)) a\n" +
            "left outer join\n" +
            "(select movie_id, sum(amount) as revenue from billing\n" +
            "where movie_hall_id in (select distinct movie_hall_id from movie_hall where user_id = ?) group by movie_id) b using (movie_id) order by revenue desc";
        conn.query(query, [msg.user_id, msg.user_id], function (err, result) {
            if (err){
                res.statusCode = 401;
                res.message = err;
                callback(err, res);
            }
            else {
                res.message = result;
                callback(null, res);
            }
        });
    }
    if (msg.type === "get_user_bill_details"){
        let query = "select billing_id, username, title as movie_name, movie_hall_name, screen_number, amount, billing.date\n" +
            "from billing inner join users using (user_id)\n" +
            "inner join movies using (movie_id) \n" +
            "inner join movie_hall using (movie_hall_id) \n" +
            "inner join screen using (screen_id)\n" +
            "where billing.movie_hall_id in (select distinct movie_hall_id from movie_hall where user_id = ?)";
        conn.query(query, [msg.user_id], function (err, result) {
            if (err){
                res.statusCode = 401;
                res.message = err;
                callback(err, res);
            }
            else {
                res.message = result;
                callback(null, res);
            }
        });
    }
    if (msg.type === "cancel_user_booking"){
        let query = "delete from billing where billing_id = ?";
        conn.query(query, [msg.billing_id], function (err, result) {
            if (err){
                res.statusCode = 401;
                res.message = err;
                callback(err, res);
            }
            else {
                res.message = "Deleted user booking Successfully";
                callback(null, res);
            }
        });
    }
    if (msg.type === "search_movie_hall_admin"){
        let query = "select movie_hall_id, user_id, screen_id, movie_hall_name, ticket_price, city, movie_id, screen_number, slot1, slot2, slot3, slot4, max_seats, title as movie_name\n" +
            "from movie_hall inner join screen using (movie_hall_id) inner join movies using (movie_id)\n" +
            "where user_id = ? and title like '%"+msg.searchtext+"%'";
        conn.query(query, [msg.user_id], function (err, result) {
            if (err){
                res.statusCode = 401;
                res.message = err;
                callback(err, res);
            }
            else {
                res.message = result;
                callback(null, res);
            }
        });
    }

    if(msg.type ==='getMovieHallsAndTimes'){
        pool.getConnection(function(err, connection){
          connection.query("select movie_hall_id from screen where movie_id ="+msg.data+" group by movie_hall_id; " ,function(err,rows){
            connection.release();//release the connection
            if(err) {
               res.code = "500";
               data = {success: false,message: "Cannot get Movie Halls and Times. Some internal error occured!"};
               res.value = data;
               callback(null, res);
             }
             else if(rows==undefined || rows.length ==0 ){
               res.code = "500";
               data = {success: false,message: "This Movie has been added to any halls yet!"};
               res.value = data;
               callback(null, res);
             }else{
               rows.map(row => {
                 pool.getConnection(function(err, connection){
                   connection.query("select sum(slot1),sum(slot2),sum(slot3),sum(slot4), sum(max_seats) from screen where movie_hall_id ="+ row.movie_hall_id ,function(err,rows){
                     connection.release();//release the connection
                     // TODO
                   });
                 });
               });
             }
           });
        });
    }
}

exports.handle_request = handle_request;
