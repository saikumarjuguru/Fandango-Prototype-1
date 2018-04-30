var mongoose = require('mongoose');
var Billing= require('../schemas/billing');
let User = require('../schemas/users');
let MovieHall = require('../schemas/movie_halls');
var con = require('../pool');

function handle_request(msg, callback){

    var res = {
        statusCode:200,
        message:""
    };

    console.log(msg);
    if(msg.type=='add_bill'){
    var bill = msg.bill;
    console.log("bill",bill);
        con.getConnection((err,con)=>{
            if(err) throw err;
            //begin transaction
        con.beginTransaction(function(err) {
            if(err) {
                throw err;
            }
            con.query('INSERT INTO billing (movie_id,movie_hall_id,screen_number,user_id,amount,tax) VALUES(?,?,?,?,?,?)',
            [bill.movie_id,bill.movie_hall_id,bill.screen_number,bill.user_id,bill.amount,bill.tax],function(err,result){
                if(err) {
                    con.rollback(function() {
                    throw err;
                });
                }
                con.query('SELECT * FROM screen WHERE screen_id=?',[bill.screen_id],function(err,screen){
                    
                    if (err) { 
                        con.rollback(function() {
                        throw err;
                        });
                    }  
                    let temp="";
                    if(bill.slot=="slot1"){
                        temp = screen[0].slot1-bill.number_of_seats;
                    } else if (bill.slot == "slot2"){
                        temp = screen[0].slot2-bill.number_of_seats;
                    } else if(bill.slot=="slot3"){
                        temp = screen[0].slot3-bill.number_of_seats;
                    } else {
                        temp = screen[0].slot4 - bill.number_of_seats;
                    }
                    con.query('UPDATE screen SET '+bill.slot+' =? WHERE screen_id=?',[temp,bill.screen_id],function(err,result){
                        if (err) { 
                            con.rollback(function() {
                            throw err;
                            });
                        }  

                    });
                    if(bill.save==1){
                        console.log("I am saving data..");
                        con.query('UPDATE users SET credit_card_number=?,expiration_date=? WHERE user_id=?',[bill.credit_card_number,bill.expiration_date,bill.user_id],function(err,result){
                            if (err) { 
                                con.rollback(function() {
                                throw err;
                                });
                            }  
                        });
                    }
                });
                con.commit(function(err) {
                    if (err) { 
                      con.rollback(function() {
                        throw err;
                      });
                    }
                    console.log("Transaction Complete!");
                    con.end();
                });
                res.success = true;
                res.message = result;
                callback(null, res);

            });
        });
        //end of transaction block
        });
        

    }
    if(msg.type=='get_bill'){
        Billing.findById(msg.bill_id).populate('movie').exec((err,bill)=>{
            if(err){
                res.success = true;
                res.message = err;
                callback(null, res);
            } else {
                res.success = false;
                res.message = bill;
                callback(null,res);
            }
        });
    }
    if(msg.type=='get_all_purchases'){
        User.findById(msg.user_id,(err,user)=>{
            if(err){
                res.success = false;
                res.message = "User Not Found";
                callback(null,res);
            } else{
                Billing.find({user:user._id}).populate('movie').exec((err,bills)=>{
                    if(err){
                        res.success = false;
                        res.message = "No Purchases";
                        callback(null,res);
                    } else {
                        res.success = true;
                        res.message = bills;
                        callback(null,res);
                    }
                });
            }
        });
    }
}

exports.handle_request = handle_request;
