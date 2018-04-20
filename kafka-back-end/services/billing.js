var mongoose = require('mongoose');
var Billing= require('../schemas/billing');
let User = require('../schemas/users');
let MovieHall = require('../schemas/movie_halls');
var con = require('../connection_pool');

function handle_request(msg, callback){

    var res = {
        statusCode:200,
        message:""
    };

    console.log(msg);
    if(msg.type=='add_bill'){
    var bill = msg.bill;
    // var result = new Billing(bill);
    //         result.save(function (err) {
    //             if (err) throw err;
    //             User.findById(msg.bill.user,function(err,user){
    //                 if(err) throw err;
    //                 user.credit_card_number = msg.bill.credit_card_number;
    //                 user.cvv = msg.bill.cvv;
    //                 user.expiration_date = msg.bill.expiration_date;
    //                 user.save((err)=>{
    //                     if(err) throw err;
    //                 });
    //             });
    //             MovieHall.findById(msg.bill.movie_hall,function(err,hall){
    //                 if(err) throw err;
    //                 let temp = hall.number_of_tickets;
    //                 temp = temp-msg.bill.number_of_seats; 
    //                 hall.number_of_tickets = temp;
    //                 hall.save((err)=>{
    //                     if(err) throw err;
    //                 });
                    
    //             });
    //         });
    //         console.log(result);
    //         res.success = true;
    //         res.message = result;
    
    con.query('INSERT INTO billing (movie_id,movie_hall_id,screen_id,user_id,amount,tax) VALUES(?,?,?,?,?,?)',
    [bill.movie_id,bill.movie_hall_id,bill.screen_id,bill.user_id,bill.amount,bill.tax],function(err,result){
        if(err) throw err;
        con.query('SELECT * FROM screen WHERE screen_id=?',[bill.screen_id],function(err,screen){
            if(err) throw err;
            let temp="";
            if(bill.slot==1){
                temp = screen[0].slot1-bill.number_of_seats;
            } else if (bill.slot == 2){
                temp = screen[0].slot2-bill.number_of_seats;
            } else if(bill.slot==3){
                temp = screen[0].slot3-bill.number_of_seats;
            } else {
                temp = screen[0].slot4 - bill.number_of_seats;
            }
            con.query('UPDATE screen SET slot'+bill.slot+' =? WHERE screen_id=?',[temp,bill.screen_id],function(err,result){
                if(err) throw err;
               
            });
            if(bill.save==1){
                con.query('UPDATE users SET credit_card_number=?,expiration_date=? WHERE user_id=?',[bill.credit_card_number,bill.expiration_date,bill.user_id],function(err,result){
                    if(err) throw err;
                });
            }
        });
        res.success = true;
        res.message = result;
        callback(null, res);
        
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
