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
            "from movie_hall inner join screen using (movie_hall_id) left outer join movies using (movie_id)\n" +
            "where user_id = (?) group by movie_id, screen_number order by movie_hall_id, screen_number";
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
        let query = "select billing_id, username, title as movie_name, movie_hall_name, screen_number, amount, billing.date,\n" +
            "if(is_cancelled = 1, 'Cancelled', 'Booked') as booking_status\n" +
            "from billing inner join users using (user_id)\n" +
            "inner join movies using (movie_id) \n" +
            "inner join movie_hall using (movie_hall_id)\n" +
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
        let query = "update billing set is_cancelled = 1 where billing_id = ?";
        conn.query(query, [msg.billing_id], function (err, result) {
            if (err){
                res.statusCode = 401;
                res.message = err;
                callback(err, res);
            }
            else {
                res.message = "Cancelled user booking Successfully";
                callback(null, res);
            }
        });
    }
    if (msg.type === "search_movie_hall_admin"){
        let query = "select movie_hall_id, user_id, screen_id, movie_hall_name, ticket_price, city, movie_id, screen_number, slot1, slot2, slot3, slot4, max_seats, title as movie_name\n" +
            "from movie_hall inner join screen using (movie_hall_id) inner join movies using (movie_id)\n" +
            "where user_id = ? and title like '%"+msg.searchtext+"%' group by movie_id, screen_number";
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
    if (msg.type === "edit_movie_info"){
        let query = "update movie_hall inner join screen using (movie_hall_id)\n" +
            "set screen.slot1 = ?, screen.slot2 = ?, screen.slot3 = ?, screen.slot4 = ?, \n" +
            "screen.movie_id = ?, screen.max_seats = ?, movie_hall.ticket_price = ?\n" +
            "where movie_hall_id = ? and screen_number = ?";
        let params = [msg.slot1, msg.slot2, msg.slot3, msg.slot4, msg.movie_id, msg.max_seats, msg.ticket_price, msg.movie_hall_id, msg.screen_number];
        conn.query(query, params, function (err, result) {
            if (err){
                res.statusCode = 401;
                res.message = err;
                callback(err, res);
            }
            else {
                res.message = "Movie Information changed successfully";
                callback(null, res);
            }
        });
    }
    if (msg.type === "get_movie_names"){
        let query = "select distinct movie_id, title as movie_name from movies";
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
        var hallWithSlot=[];
        conn.getConnection(function(err, connection){
          connection.query("select mh.* from screen s join movie_hall mh on mh.movie_hall_id = s.movie_hall_id where s.movie_id ="+msg.data+" group by mh.movie_hall_id; " ,function(err,rows){
            connection.release();//release the connection
            if(err) {
               res.code = "500";
               data = {success: false,message: "Cannot get Movie Halls and Times. Some internal error occured!"};
               res.value = data;
               callback(null, res);
             }
             else if(rows==undefined || rows.length ==0 ){
               res.code = "400";
               data = {success: false,message: "This Movie hasn't been added to any halls yet!"};
               res.value = data;
               callback(null, res);
             }else{

               var count = 0;

               rows.forEach((row)=> {
                   conn.getConnection(function(err, connection){
                   connection.query("select sum(slot1) as availableSeatsForSlot1 ,sum(slot2) as availableSeatsForSlot2,sum(slot3) as availableSeatsForSlot3,sum(slot4) as availableSeatsForSlot4, sum(max_seats) from screen where  movie_id ="+msg.data+ " and movie_hall_id ="+ row.movie_hall_id +" and date_of_movie = '"+ msg.date + "';",function(err,rows1){
                     connection.release();
                     if(err){
                       throw err;
                     }
                     if(rows1 !== undefined && rows1.length >0){
                       console.log("77777777 + " + rows1[0].availableSeatsForSlot4 );
                       var slot1Available = ( rows1[0].availableSeatsForSlot1 == null ) ? undefined  :  ( rows1[0].availableSeatsForSlot1 == 0 ? false :true);
                       var slot2Available = ( rows1[0].availableSeatsForSlot2 == null ) ? undefined  :  ( rows1[0].availableSeatsForSlot2 == 0 ? false :true);
                       var slot3Available = ( rows1[0].availableSeatsForSlot3 == null ) ? undefined  :  ( rows1[0].availableSeatsForSlot3 == 0 ? false :true);
                       var slot4Available = ( rows1[0].availableSeatsForSlot4 == null ) ? undefined  :  ( rows1[0].availableSeatsForSlot4 == 0 ? false :true);

                        var data1 = {
                            movie_hall : row,
                            slot1Available : slot1Available,
                            slot2Available : slot2Available,
                            slot3Available : slot3Available,
                            slot4Available : slot4Available
                        }
                         hallWithSlot.push(data1);
                         count++;
                         if(count === rows.length){
                           res.code = "200";
                           data = {success: true,hallWithSlot: hallWithSlot};
                           res.value = data;
                           callback(null, res);
                         }
                       }
                   });
                 });



               });



             }
           });
        });
    }

    if(msg.type==='check'){
        response = {
            success:"",
            message:{ screen_number:"",screen_id:""},
            statusCode :200
        }
        let screen_number = "";
        let query = 'SELECT * FROM screen WHERE movie_id=? AND movie_hall_id=?';
        conn.query('SELECT * FROM screen WHERE movie_id=? AND movie_hall_id=? AND date_of_movie=?',[msg.movie_id,msg.movie_hall_id,msg.date_of_movie],function(err,screens){
            if(err) throw err;
            for(var i=0; i<screens.length;i++){

                if(screens[i][msg.slot]<msg.seats) {
                    continue;
                } else {
                    screen_number= screens[i]['screen_number'];
                    response.message.screen_number = screen_number;
                    response.message.screen_id = screens[i]['screen_id']
                    response.success = true;
                    callback(null,response);
                }
            }

                response.message.screen_number = screen_number;
                response.message.screen_id = "";
                response.success = false;
                callback(null,response);

        });
    }
}

exports.handle_request = handle_request;
