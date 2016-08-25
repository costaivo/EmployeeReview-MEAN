var express = require('express'),
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	bodyParser = require('body-parser'),
	cors = require('express-cors'),
	mongoose = require('mongoose');

var app = express();
var envConfig = require('./app/config/config.env.js');

var user = require('./app/routes/user');

	//Setting up the app
	app.set('view engine','ejs');	//setting view engine as ejs
	app.use(express.static('app'));	//setting up middleware to serve static files
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(cors({
		allowedOrigins:['http://localhost:3000'],
		//headers:[]
	}));

//MongoClient.connect('mongodb:.....'function(err,db)){		};	

mongoose.connect(envConfig.mongoUrl,function(err){
	if(err) mongooseLog('Mongoose Error:'+ err);
});

mongoose.connection
    .on('connected', function () {
        mongooseLog('Connection open to ' + envConfig.mongoUrl);
    })
    .on('error',function (err) {
        mongooseLog('Connection error: ' + err);
    })
    .on('disconnected', function () {
        mongooseLog('Connection disconnected');
    });


function mongooseLog(data) {
  return console.log(data);
}

app.use('/user', user);

module.exports = app;
