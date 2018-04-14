var mongoose = require('mongoose');
var Billing= require('../schemas/billing');

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
            });
            console.log(result);
            res.success = true;
            res.message = result;
    callback(null, res);
    }
    if(msg.type=='get_bill'){
        Billing.findById(msg.bill_id, function(err, bill){
            if(err) throw err;
            if(bill){
                res.success =  true;
                res.message = bill;
                callback(null,res);
            }
        });
    }
}

exports.handle_request = handle_request;