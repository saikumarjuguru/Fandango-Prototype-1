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
router.post('/',upload.single('movie_photo'),function(req,res){
    let title = req.body.title;
    let trailer_link = req.body.trailer_link;
    let movie_characters = req.body.movie_characters;
    let release_date = req.body.release_date;
    let rating = req.body.rating;
    let photos = ["/photos/" + req.file.filename];
    //let photos = ["/photos/download.jpeg"];
    let movie_length = req.body.movie_length;
    let showing_at = req.body.showing_at;
    let reviews = req.body.reviews;
    payload = {
        action: 'movie',
        type:'store_movie',
        movie : {
            title: title,
            trailer_link: trailer_link,
            movie_characters: movie_characters,
            release_date: release_date,
            rating: rating,
            photos: photos,
            movie_length:movie_length,
            showing_at:showing_at,
            reviews: reviews
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


router.get('/:movieID',function(req,res){
  payload = {
      action:"movie",
      type:"getMoviewDetail",
      data: req.body
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
module.exports = router;
