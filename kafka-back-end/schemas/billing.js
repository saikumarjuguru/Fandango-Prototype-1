var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var BillingSchema =  new Schema({
    amount:{type:Number, required:true},
    tax:{type:Number, required:true},
    movie:{
        type:Schema.ObjectId, 
        ref:'Movie'
    },
    user: {
        type:Schema.ObjectId,
        ref:'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Billing',BillingSchema);