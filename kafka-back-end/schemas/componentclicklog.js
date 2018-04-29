var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var ComponentClicksLogSchema =  new Schema({
    component: {type:String, required:true},
    clicks: {type:Number, required:true},
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ComponentClicksLog',ComponentClicksLogSchema);