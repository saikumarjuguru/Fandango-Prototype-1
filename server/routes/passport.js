var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('local', new LocalStrategy(function(username , password, done) {
        console.log('in passport');
        payload = {
            action: 'login',
            user:{
                username: username,
                password: password
            }
        }
        kafka.make_request('requestTopic',payload, function(err,results){
            if(err){
                console.log("ERROR");
                done(err,{});
            }
            else
            {
                if(results.code == 200){
                    console.log("Success");
                    done(null,results);
                }
                else {
                    done(null,false);
                }
            }
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

};
