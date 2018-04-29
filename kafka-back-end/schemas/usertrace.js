var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var UserTraceSchema =  new Schema({
    user_id: Number,
    user:{type:JSON,required:true},
    path: [],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserTrace',UserTraceSchema);