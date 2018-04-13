var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var MovieSchema =  new Schema({
    title: {type:String, required:true},
    trailer_link: {type:String, required:true},
    movie_characters:{type:String,required:true},
    release_date: {type:Date, required:true},
    rating: {type: String, required:true},
    photos:[{type:String, required:true}],
    movie_length:{type: String, required:true},
    showing_at: {type: String, required: true},
    reviews:[{type:String}],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User',MovieSchema);