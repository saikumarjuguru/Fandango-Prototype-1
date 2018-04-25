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
            "from movie_hall left outer join screen using (movie_hall_id) group by movie_hall_id";
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

}

exports.handle_request = handle_request;