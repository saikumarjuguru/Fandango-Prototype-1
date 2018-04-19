var mongoose = require('mongoose');
var Billing= require('../schemas/billing');
let User = require('../schemas/users');

function handle_request(msg, callback){

    var res = {
        statusCode:200,
        message:""
    };

    console.log(msg);
    if(msg.type=='add_bill'){
    var bill = msg.bill;
    var result = new Billing(bill);
            result.save(function (err) {
                if (err) throw err;
                User.findById(msg.bill.user,function(err,user){
                    if(err) throw err;
                    user.credit_card_number = msg.bill.credit_card_number;
                    user.cvv = msg.bill.cvv;
                    user.expiration_date = msg.bill.expiration_date;
                    user.save((err)=>{
                        if(err) throw err;
                    });
                });
            });
            console.log(result);
            res.success = true;
            res.message = result;
    callback(null, res);
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