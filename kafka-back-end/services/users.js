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
            var user_id = msg.user_id;
            con.query('select m.title, mh.movie_hall_name from users u inner join billing b on u.user_id = b.user_id' +
                ' inner join movies m on b.movie_id = m.movie_id \n' +
                ' inner join movie_hall mh on b.movie_hall_id = mh.movie_hall_id\n' +
                ' where u.user_id = ?'
                ,[user_id],function(err,user1){
                if(err) throw err;
                else{
                    con.query(' select * from users u inner join movie_review mr  on u.user_id = mr.user_id\n' +
                        ' inner join movies m on mr.movie_id = m.movie_id' +
                        ' where u.user_id = ?'
                        ,[user_id],function(err,user2){
                            if(err) throw err;
                            else{
                                res.statusCode = 200;
                                res.myRevies = user2;
                                res.tickets_booked = user1;
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

        var query = "UPDATE users \n" +
            "SET \n" +
            "    first_name = '"+ msg.user.first_name +"',\n" +
            "    last_name = '" + msg.user.last_name + "',\n" +
            "    address = '"+ msg.user.address+ "',\n" +
            "    city = '"+msg.user.city +"',\n" +
            "    state = '"+ msg.user.state + "',\n" +
            "    zipcode =  "+ msg.user.zipcode + ",\n" +
            "    phone =  "+ msg.user.phone + "\n" +
            "WHERE\n" +
            "    user_id = ?"

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
                        console.log(user1);
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