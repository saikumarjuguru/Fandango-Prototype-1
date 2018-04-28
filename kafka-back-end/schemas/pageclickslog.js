var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var PageClicksLogSchema =  new Schema({
    page: {type:String, required:true},
    clicks: {type:Number, required:true},
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PageClicksLog',PageClicksLogSchema);