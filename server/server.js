var express = require('express'),
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	bodyParser = require('bodyParser'),
	cors = require('express-cors');

var app = express();

	//Setting up the app
	app.set('view engine','ejs');	//setting view engine as ejs
	app.use(express.static('app'));	//setting up middleware to serve static files
	app.use(bodyParser.urlencoded({extended:true}));
