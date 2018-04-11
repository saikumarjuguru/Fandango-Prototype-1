var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var UserSchema =  new Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    useroremail:{type:String,required:true},
    phone_number: {type:String, reuired:true},
    password: {type: String, reuired:true},
    profile_image_path: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User',UserSchema);