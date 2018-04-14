var mongoose = require('mongoose');
var Billing= require('../schemas/billing');

function handle_request(msg, callback){

    var res = {
        statusCode:200,
        message:""
    };

    console.log(msg);
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

exports.handle_request = handle_request;