var kafka = require('./kafka/client');
var express = require('express');
var router = express.Router();

//for storing profile image
var multer = require('multer'); //for saving files on server
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/photos/')
    },
    filename: function(req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, Date.now() + ext);
    }
});
var upload = multer({ storage: storage, dest: 'uploads/' });

router.get('/:movieID',function(req,res){
  payload = {
      action:"movie",
      type:"getMovieDetail",
      data: req.params.movieID
  }
  console.log("eee");
  kafka.make_request('requestTopic', payload, function(err,results){
      if(err){
       done(err,{});
       }
       else{
         if(results.code == 200){
            return res.status(200).json(results.value);;
          }else{
            return res.status(500).json(results.value);;
          }
       }
     });

})

router.post('/star',function(req,res){
  payload = {
      action:"movie",
      type:"starMovie",
      data: req.body
  }
  kafka.make_request('requestTopic', payload, function(err,results){
      if(err){
       done(err,{});
       }
       else{
         console.log(results.value)
         if(results.code == 200){
            return res.status(200).json(results.value);;
          }else{
            return res.status(500).json(results.value);;
          }
       }
     });
});

router.get('/review/:movieID',function(req,res){
  payload = {
      action:"movie",
      type:"reviewsOfMovie",
      data: req.params.movieID
  }
  kafka.make_request('requestTopic', payload, function(err,results){
      if(err){
       done(err,{});
       }
       else{
         console.log(results.value)
         if(results.code == 200){
            return res.status(200).json(results.value);;
          }else{
            return res.status(500).json(results.value);;
          }
       }
     });
});

router.post('/review',function(req,res){
  payload = {
      action:"movie",
      type:"submitCommentToMovie",
      data: req.body
  }
  kafka.make_request('requestTopic', payload, function(err,results){
      if(err){
       done(err,{});
       }
       else{
         console.log(results.value)
         if(results.code == 200){
            return res.status(200).json(results.value);;
          }else{
            return res.status(500).json(results.value);;
          }
       }
     });
});
module.exports = router;
