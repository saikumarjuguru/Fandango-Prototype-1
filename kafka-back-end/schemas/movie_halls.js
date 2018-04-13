var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var MovieHallSchema =  new Schema({
    movie_times:[{type:String, required:true}],
    number_of_tickets:{type: Number, required:true},
    screen_number:{type:String},
    ticket_price:{type:String, required: true},
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MovieHall',MovieHallSchema);