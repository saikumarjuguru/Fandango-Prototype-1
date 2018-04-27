var mongoose = require('mongoose');
var Billing= require('../schemas/billing');
let User = require('../schemas/users');
var con = require('../pool');

function handle_request(msg, callback){
    //here statusCode is for authentication 
    var res = {
        statusCode:200,
        message:"",
        tickets_booked:"",
        myRevies:""
    };

    console.log(msg);
    if(msg.type == "get_user") {
        var user_id = msg.user_id;
        con.query('SELECT * FROM users WHERE user_id=?', [user_id], function (err, user) {
            if (err) throw err;
            if (user.length > 0) {
                console.log(user);
                res.success = true;
                res.message = user[0];
                callback(null, res);
            }
        });
    }

    if(msg.type == "get_user_history"){
        console.log("Inside history kafka");
            var user_id = msg.user_id;
            console.log(user_id);
            var query = "select m.title, mh.movie_hall_name from users u inner join billing b on u.user_id = b.user_id inner join movies m on b.movie_id = m.movie_id  inner join movie_hall mh on b.movie_hall_id = mh.movie_hall_id where u.user_id = 1";
            console.log(query);
            con.query(query,function(err,user1){
                if(err){
                    res.statusCode = 401;
                    res.message = err;
                    callback(err, res);
                }
                else{
                    console.log("Inside here");
                    // console.log(user1);
                    var query1 = "select * from users u inner join movie_review mr  on u.user_id = mr.user_id inner join movies m on mr.movie_id = m.movie_id where u.user_id = 1"
                    console.log(query1);
                    con.query(query1,function(err,user2){
                            if(err){
                                res.statusCode = 401;
                                res.message = err;
                                callback(err, res);
                            }
                            else{
                                console.log(user2);
                                res.statusCode = 200;
                                res.myRevies = user2;
                                res.tickets_booked = user1;
                                callback(null, res);
                            }
                        });
                }
            });
    }

    if(msg.type=='delete_user'){
        var user_id = msg.user_id;
        User.findByIdAndRemove(msg.user_id,function(err,user){
            if(err) {
                res.success = false;
                res.message = err;
                callback(null,res);
            } else {
                res.success = true;
                res.message = user;
                callback(null,res);
            }
        });
    }

    if(msg.type=='update_user'){
        console.log("Inside Kafka ");
        var user_id = msg.user.user_id;
        var query = "";
        if(msg.user.profile_path == "")
        {
            query = "UPDATE users " +
                "SET " +
                "    first_name = '"+ msg.user.first_name +"', " +
                "    last_name = '" + msg.user.last_name + "', " +
                "    address = '"+ msg.user.address+ "', " +
                "    city = '"+msg.user.city +"', " +
                "    state = '"+ msg.user.state + "', " +
                "    zipcode =  "+ msg.user.zipcode + ", " +
                "    phone =  "+ msg.user.phone + " " +
            " WHERE " +
            "    user_id = ?"
        }
        else {
            query = "UPDATE users " +
                "SET " +
                "    first_name = '" + msg.user.first_name + "', " +
                "    last_name = '" + msg.user.last_name + "', " +
                "    address = '" + msg.user.address + "', " +
                "    city = '" + msg.user.city + "', " +
                "    state = '" + msg.user.state + "', " +
                "    zipcode =  " + msg.user.zipcode + ", " +
                "    phone =  " + msg.user.phone + ", " +
                "    profile_image =  '" + msg.user.profile_path + "'" +
            " WHERE " +
            "    user_id = ?"
        }

        console.log(query);
        con.query(query,[user_id],function(err,user){
            console.log("inside user update result" + user);
            if(err){
                res.statusCode = 400;
                res.message = err;
                callback(err, res);
            }
            else{
                con.query('SELECT * FROM users WHERE user_id=?',[user_id],function(err,user1){
                    if(err){
                        res.statusCode = 400;
                        res.message = err;
                        callback(err, res);
                    }
                    if(user1.length>0){
                        // console.log(user1);
                        res.statusCode = 200;
                        res.success = true;
                        res.message = user1[0];
                        callback(null, res);
                    }

                });
            }
        });
    }
}

exports.handle_request = handle_request;