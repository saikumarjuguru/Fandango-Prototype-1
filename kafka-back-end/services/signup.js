var mongoose = require('mongoose');
var User = require('../schemas/users');
var pool = require('./../pool');

function handle_request(msg, callback) {

    var res = {};
    console.log("----------------------------------");
    console.log(msg.user);
    console.log("----------------------------------");

    var reqEmail = msg.user.email;
    var reqUsername = msg.user.username;
    var password = msg.user.password;

    console.log("Inside Kafka signup");

    var query = "select * from users where email = '" + reqEmail + "'";
    pool.getConnection(function(err, connection) {
        connection.query(query, function (err, rows) {
            if(rows!=undefined && rows.length > 0)
            {
                console.log("Existing Email");
                data = {success: false,message: "Existing Email or Username!"};
                res.code = "400";
                res.value = data;
                callback(null, res);
            }
            else{
                var query = "insert into users (username, password , email) values ('" + reqUsername + "','" + password + "','" + reqEmail + "')";
                pool.getConnection(function(err, connection){
                    connection.query(query,function(err,rows){
                        console.log(rows);
                        connection.release();//release the connection
                        if(err) {
                            console.log(err);
                            res.code = "500";
                            data = {success: false,message: "Existing Email or Username!"};
                            res.value = data;
                            callback(null, res);
                        }
                        else if( rows.serverStatus = 2) {
                            query = "select * from users where user_id = " + rows.insertId;
                            pool.getConnection(function (err, connection) {
                                connection.query(query, function (err, row1) {
                                    console.log(row1);
                                    connection.release();//release the connection
                                    if (err) {
                                        console.log(err);
                                        res.code = "500";
                                        data = {success: false, message: "Cannot Sign up. Some internal error occured!"};
                                        res.value = data;
                                        callback(null, res);
                                    }
                                    else {
                                        var data = {success: true, message: "Sign up successfully", userId: rows.insertId, userDetails: row1};
                                        res.code = "200";
                                        res.value = data;
                                        console.log(rows.insertId);
                                        callback(null, res);
                                    }
                                });

                            });
                        }
                        else{
                            console.log("Inside Log");
                            data = {success: false,message: "Existing Email or Username"};
                            res.code = "400";
                            res.value = data;
                            callback(null, res);
                        }
                    });
                })
            }
        });
    });


};

exports.handle_request = handle_request;