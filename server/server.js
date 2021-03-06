var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressSessions = require("express-session");
var passport = require("passport");


//connecting to mlab using mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://fan:123@ds115352.mlab.com:15352/fandango',function(err){
    if(err) throw err;
    console.log("Successfully connected to MongoDB");
});
var mongoStore = require("connect-mongo")(expressSessions);
var passport = require('passport');
var index = require('./routes/index');
var login = require('./routes/login');
let users = require('./routes/users');
let movie = require('./routes/movie');
let movie_hall = require('./routes/movie_hall');
let billing = require('./routes/billing');
var signup = require('./routes/signup');
let admin = require('./routes/admin');
let logs = require('./routes/logs');

var app = express();
const port = process.env.PORT || 5000;
//Enable CORS
var corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors(corsOptions))
app.use(cookieParser('CMPE273_passport'));

app.use(express.static(__dirname + '/uploads'));
var mongoSessionURL = "mongodb://fan:123@ds115352.mlab.com:15352/fandango";
app.use(expressSessions({
  secret: "CMPE273_passport",
  resave: false,
  saveUninitialized: true,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 6 * 1000,
  store: new mongoStore({
        mongooseConnection: mongoose.connection,
        touchAfter: 24 * 3600})
}));
app.use(passport.initialize());
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);
app.use('/users',users);
app.use('/movie_hall',movie_hall);
app.use('/movie',movie);
app.use('/billing',billing);
app.use('/signup',signup);
app.use('/admin',admin);
app.use('/logs',logs);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
    res.header('Access-Control-Allow-Credentials', true);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});
app.set('secret', 'CMPE273_passport');
app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/auth', function(req, res){
    //var user = req.body;
    if (req.isAuthenticated()) {
        res.status(200).send({ success: true, message: 'User already logged in!' });
    } else {
        res.status(401).send({ success: false, message: 'Authentication failed.' });
    }
});

app.get('/logout', function(req, res){
    req.logout();
    req.session.destroy();
    res.status(200).send({ success: true, message: 'User successfully logged out!' });
});

module.exports = app;
