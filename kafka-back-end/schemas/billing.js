var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var BillingSchema =  new Schema({
    show_time:{type:String, required:true},
    number_of_seats: {type:Number, required:true},
    amount:{type:Number, required:true},
    tax:{type:Number, required:true},
    movie_hall: {
        type:Schema.ObjectId, 
        ref:'MovieHall'
    },
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