var kafka = require('./kafka/client');
var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
var fs = require('fs-extra');


//for storing profile image
var multer = require('multer'); //for saving files on server 
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/profile_images/')
    },
    filename: function(req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, Date.now() + ext);
    }
});
var upload = multer({ storage: storage, dest: 'uploads/' });

router.post('/:userID',upload.single('profile_image'),function(req,res){
    console.log(req.body);
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let phone = req.body.phone;
    let address = req.body.address;
    let state = req.body.state;
    let city = req.body.city;
    let zipcode =req.body.zipcode;
    // let password = req.body.pwd;
    // let expiration_date = req.body.expiration_date;
    // let credit_card_number = req.body.credit_card_number;
    //console.log(req);
    let profile_image_path
    if(req.file) {
        profile_image_path = "uploads/profile_images/" + req.file.filename;
    }
    else
    {
        profile_image_path = "";
    }
    console.log(profile_image_path);
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.pwd, salt, function(err, hash) {
            password = hash;
            console.log(password);
            payload = {
                action:"user",
                type:"update_user",
                user : {
                    user_id : req.params.userID,
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email,
                    "phone": phone,
                    "address": address,
                    "zipcode":zipcode,
                    "city":city,
                    "state": state,
                    "profile_path":profile_image_path
                }
             }
             console.log("******************" + payload);
            kafka.make_request('requestTopic',payload, function(err,results){
                console.log('in result');
                console.log(results);
                if(err){
                    console.log(err);
                    res.status(400).send({statusCode: 400, message : "", error: err.toString()});
                }
                else
                {
                    console.log(results);
                    res.send(results);   
                }
            });
        });
    });
});

router.get('/:userID',function(req,res){
    console.log("USER_ID: " + req.params.userID);
    payload = {
        action:"user",
        type:"get_user",
        user_id:req.params.userID
    }
    kafka.make_request('requestTopic',payload, function(err,results){
        console.log('in get user result');
        //console.log(results);
        if(err){
            throw err;
        }
        else
        {
            // console.log(results);
            console.log("-----------" + results.message.profile_image + "----------------------" );
            if (results.message.profile_image) {
                console.log("Inside Image &&&&&&&&&&&&&&&");
                var buffer = fs.readFileSync(results.message.profile_image);
                var bufferBase64 = new Buffer(buffer);
                results.message.encodeImage = bufferBase64;
            } else {
                //console.log(obj);
                var buffer = fs.readFileSync("./uploads/profile_images/default.png");
                var bufferBase64 = new Buffer(buffer);
                results.message.encodeImage = bufferBase64;
            }
            res.send(results);   
        }
    });
});
router.delete('/:userID',function(req,res){
    payload = {
        action:'user',
        type:"delete_user",
        user_id:req.params.userID
    }
    kafka.make_request('requestTopic',payload, function(err,results){
        console.log('in delete user result');
        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            console.log(results);
            res.send(results);   
        }
    });
});

router.get('/get_history/:userID',function(req,res){
    console.log("Inside History *********************************");
    console.log("USER_ID: " + req.params.userID);
    payload = {
        action:"user",
        type:"get_user_history",
        user_id:req.params.userID
    }
    kafka.make_request('requestTopic',payload, function(err,results){
        // console.log('in get user result');
        // console.log(results);
        if(err){
            throw err;
        }
        else
        {
            res.send(results);
        }
    });
});

module.exports = router;


