var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    bodyParser = require('body-parser'),
    cors = require('express-cors'),
    mongoose = require('mongoose'),
    path = require('path');

var multer = require('multer');
var app = express();
var envConfig = require('./app/config/config.env.js');
var port = require('./app/config/config.env.js').port;

var user = require('./app/routes/user');
var skill = require('./app/routes/skill');
var task = require('./app/routes/task');
var project = require('./app/routes/project');

//Setting up the app
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade'); //setting view engine as jade
app.use(express.static('app')); //setting up middleware to serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    allowedOrigins: ['http://localhost:3000'],
    //headers:[]
    headers: [
        'x-access-token', 'Content-Type',
        'Authorization', 'Bearer'
    ]
}));

//MongoClient.connect('mongodb:.....'function(err,db)){     };  

mongoose.connect(envConfig.mongoUrl, function(err) {
    if (err) mongooseLog('Mongoose Error:' + err);
});

mongoose.connection
    .on('connected', function() {
        mongooseLog('Connection open to ' + envConfig.mongoUrl);
    })
    .on('error', function(err) {
        mongooseLog('Connection error: ' + err);
    })
    .on('disconnected', function() {
        mongooseLog('Connection disconnected');
    });


function mongooseLog(data) {
    return console.log(data);
}

app.use(function(req, res, next) {
    console.log("\033[34m \033[1m" + req.method,
        "\033[36m \033[1m REQUEST URL: " + "\033[32m " + req.url,
        "\033[36m \033[1m REQUEST TIME: " + "\033[32m " + new Date() + "\033[31m ");
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ dest: './public/temp/' }).single('file'));

app.use('/user', user);
app.use('/skill', skill);
app.use('/task', task);
app.use('/project', project);

app.get('/', function(req, res) {
    res.send("Server waiting for requests on port " + port);
});
//app.set('port', 9000);

app.listen(9000, function() {
    console.log("Express server listening on port " + port);
});


module.exports = app;
