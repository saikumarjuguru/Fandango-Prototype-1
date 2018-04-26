var conn = require('../pool');

function handle_request(msg, callback){

    var res = {
        statusCode:200,
        message:""
    };

    if (msg.type === "get_revenue_by_movie"){
        let query = "select movie_id, movie_name, ifnull(revenue, 0) as revenue from\n" +
            "(select movie_id, title as movie_name from movies) a\n" +
            "left outer join\n" +
            "(select movie_id, sum(amount) as revenue from billing group by movie_id) b using (movie_id) order by revenue desc";
        conn.query(query, function (err, result) {
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

    if (msg.type === "get_revenue_by_movie_hall"){
        let query = "select movie_hall_id, movie_hall_name, ifnull(revenue, 0) as revenue from\n" +
            "(select movie_hall_id, movie_hall_name from movie_hall) a\n" +
            "left outer join\n" +
            "(select movie_hall_id, sum(amount) as revenue from billing group by movie_hall_id) b using (movie_hall_id) order by revenue desc";
        conn.query(query, function (err, result) {
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

    if (msg.type === "get_movie_hall_info"){
        let query = "select movie_hall_id, movie_hall_name, ticket_price, city, max_seats\n" +
            "from movie_hall left outer join screen using (movie_hall_id) group by movie_hall_id order by movie_hall_name";
        conn.query(query, function (err, result) {
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

    if (msg.type === "add_movie_hall"){
        let insertQuery = "insert into movie_hall (movie_hall_name, ticket_price, city)\n" +
            "values (?,?,?)";
        conn.query(insertQuery, [msg.movie_hall_name, msg.ticket_price, msg.city], function (err, result) {
            if (err){
                res.statusCode = 401;
                res.message = err;
                callback(err, res);
            }
            else {
                let selectQuery = "select distinct movie_hall_id from movie_hall where movie_hall_name = ? order by movie_hall_id desc";
                conn.query(selectQuery, [msg.movie_hall_name], function (err, result) {
                    if (err){
                        console.log(err);
                    }
                    else {
                        let movie_hall_id = result[0].movie_hall_id;
                        let insertScreensQuery = "insert into screen (movie_hall_id, screen_number, date_of_movie, max_seats) \n" +
                            "values (?, 1, current_date(), ?),\n" +
                            "(?, 1, current_date() + interval 1 day, ?), (?, 1, current_date() + interval 2 day, ?),\n" +
                            "(?, 1, current_date() + interval 3 day, ?), (?, 1, current_date() + interval 4 day, ?),\n" +
                            "(?, 1, current_date() + interval 5 day, ?), (?, 1, current_date() + interval 6 day, ?),\n" +
                            "(?, 2, current_date(), ?),\n" +
                            "(?, 2, current_date() + interval 1 day, ?), (?, 2, current_date() + interval 2 day, ?),\n" +
                            "(?, 2, current_date() + interval 3 day, ?), (?, 2, current_date() + interval 4 day, ?),\n" +
                            "(?, 2, current_date() + interval 5 day, ?), (?, 2, current_date() + interval 6 day, ?),\n" +
                            "(?, 3, current_date(), ?),\n" +
                            "(?, 3, current_date() + interval 1 day, ?), (?, 3, current_date() + interval 2 day, ?),\n" +
                            "(?, 3, current_date() + interval 3 day, ?), (?, 3, current_date() + interval 4 day, ?),\n" +
                            "(?, 3, current_date() + interval 5 day, ?), (?, 3, current_date() + interval 6 day, ?)";
                        let params = [];
                        for (let i = 0; i < 21; i++){
                            params.push(movie_hall_id);
                            params.push(msg.max_seats);
                        }
                        conn.query(insertScreensQuery, params, function (err, result) {
                            if (err){
                                console.log(err);
                            }
                            else {
                                res.message = "Movie Hall Added Successfully";
                                callback(null, res);
                            }
                        });
                    }
                });
            }
        });
    }

    if (msg.type === "edit_movie_hall"){
        let updateQuery = "update movie_hall inner join screen using (movie_hall_id) \n" +
            "set movie_hall.movie_hall_name = ?, movie_hall.ticket_price = ?, movie_hall.city = ?, screen.max_seats = ?\n" +
            "where movie_hall_id = ?";
        let params = [msg.movie_hall_name, msg.ticket_price, msg.city, msg.max_seats, msg.movie_hall_id];
        conn.query(updateQuery, params, function (err, result) {
            if (err){
                res.statusCode = 401;
                res.message = err;
                callback(err, res);
            }
            else {
                res.message = "Movie Hall Info updated";
                callback(null, res);
            }
        });
    }

    if (msg.type === "get_user_bill_details"){
        let query = "select billing_id, username, title as movie_name, movie_hall_name, screen_number, amount, \n" +
            "billing.date, if(is_cancelled = 1, 'Cancelled', 'Booked') as booking_status\n" +
            "from billing inner join users using (user_id)\n" +
            "inner join movies using (movie_id) \n" +
            "inner join movie_hall using (movie_hall_id)";
        conn.query(query, function (err, result) {
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

    if (msg.type === "get_movies_in_hall"){
        let query = "select movie_hall_id, screen_id, movie_hall_name, ticket_price, city, movie_id, screen_number, " +
            "slot1, slot2, slot3, slot4, max_seats, title as movie_name, see_it_in\n" +
            "from movie_hall inner join screen using (movie_hall_id) left outer join movies using (movie_id)\n" +
            "where movie_hall_id = (?) group by movie_id, screen_number order by movie_hall_id, screen_number";
        conn.query(query, [msg.movie_hall_id], function (err, result) {
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

}

exports.handle_request = handle_request;