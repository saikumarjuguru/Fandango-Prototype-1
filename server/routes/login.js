var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var fs = require('fs-extra')
var passport = require('passport');
require('./passport')(passport);
var router = express.Router();

router.post('/', (req, res) => {

    passport.authenticate('local', function(err, user, info) {
        console.log("PASSPORT"+ user);
        if(err) {
            return res.status(401).send({ success: false, message: 'Authentication failed.' });
        }
        if(!user){
            return res.status(400).send({ success: false, message: 'The email and password you entered did not match our records. Please double-check and try again.' });
        }
        else {
            req.logIn(req.body, function (err) {
                if (err) {
                    res.status(401).send({success: false, message: 'Authentication failed.'});
                }
                console.log(user);
                return res.json(user);
            });
        }
        // else {
        //   req.logIn(req.body, function(err) {
        //       console.log(err);
        //       if(err) {
        //         return res.status(401).send({ success: false, message: 'The email and password you entered did not match our records. Please double-check and try again.' });
        //       }
        //       var data = {
        //       userId : user.username
        //     };
        //       var token = jwt.sign(data, req.app.get('secret'), {
        //          expiresIn : 60*60
        //       });
        //
        //
        //       console.log("USERNAME "+ user.username);
        //       return  res.json({
        //           success: true,
        //           message: 'Successful',
        //           username : user.username,
        //
        //       });
        //     });
        // }

    })(req, res);

});

module.exports = router;
