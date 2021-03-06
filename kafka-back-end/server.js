var connection =  new require('./kafka/Connection');
var login = require('./services/login');
let register = require('./services/register');
let movie_hall = require('./services/movie_hall');
let movie = require('./services/movie');
let billing = require('./services/billing');
let users = require('./services/users');
let signup = require('./services/signup');
let admin = require('./services/admin');
let logging = require('./services/logging');

var mongoose = require('mongoose');
mongoose.connect('mongodb://fan:123@ds115352.mlab.com:15352/fandango', { poolSize: 100 },function(err){
    if(err) throw err;
    console.log("Successfully connected to MongoDB");
});


var topic_name = 'requestTopic';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();

let handler = "";

console.log('server is running');
consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    switch(data.data.action){
        case 'login': handler = login;
        break;
        case 'signup': handler = signup;
        break;
        case 'movie_hall': handler = movie_hall;
        break;
        case 'movie': handler = movie;
        break;
        case 'billing': handler = billing;
        break;
        case 'user': handler = users;
        break;
        case 'admin': handler = admin;
        break;
        case 'logging': handler = logging;
        break;
        default: console.log("Handler Not Found!");
    }
    handler.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});
