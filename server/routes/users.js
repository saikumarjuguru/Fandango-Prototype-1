var kafka = require('./kafka/client');
var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();


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

router.post('/',upload.single('profile_image'),function(req,res){
    console.log(req.body);
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let useroremail = req.body.useroremail;
    let phone_number = req.body.phone_number;
    let address = req.body.address;
    let state = req.body.state;
    let city = req.body.city;
    let zip_code =req.body.zip_code;
    let password = req.body.pwd; 
    let expiration_date = req.body.expiration_date;
    let credit_card_number = req.body.credit_card_number;
    //console.log(req);
    let profile_image_path = "/profile_images/" + req.file.filename;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.pwd, salt, function(err, hash) {
            password = hash;
            console.log(password);
            payload = {
             action: 'register',
                user : {
                    "first_name": first_name,
                    "last_name": last_name,
                    "useroremail": useroremail,
                    "phone_number": phone_number,
                    "password": password,
                    "address":address,
                    "city":city,
                    "state": state,
                    "zip_code":zip_code,
                    "credit_card_number": credit_card_number,
                    "expiration_date": expiration_date,
                    "profile_image_path":profile_image_path
                }
             }
            kafka.make_request('requestTopic',payload, function(err,results){
                console.log('in result');
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

module.exports = router;


