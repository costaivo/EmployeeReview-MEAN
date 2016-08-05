var express = require('express'),
	app = express(),
	engines = require('jade'),
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	bodyParser = require('body-parser'),
	path = __dirname;
	
	app.set('view engine','jade');
	app.use(express.static('public'));
	app.use(bodyParser.urlencoded({extended:true}));
	
	MongoClient.connect('mongodb://localhost:27017/myapp',function(err,db){
		assert.equal(null,err);
		console.log('Sucessfully connected to mongodb server');
		
		app.get('/',function(req,res){
			res.sendFile(path+'/views/login.html');
		});
		app.get('/login.html',function(req,res){
			res.sendFile('/views/login.html');
			
		});
		app.get('/registration.html',function(req,res){
			res.sendFile(path+'/views/registration.html');
		});
		
		app.post('/incomingUser',function(req,res){
			var userName = req.body.email;
			var password = req.body.password;
			db.collection('employee').find({}).toArray(function(err,docs){
				docs.forEach(function(docs){
					if(userName == docs.username)
					{	if(password == docs.password)
							res.sendFile(path+'/views/home.html');
						else
						{	res.sendFile(path+'/views/login.html');
						}
					}					
				});
				res.sendFile(path+'/views/registration.html');
			});
		});
		
		app.post('/registrationdetails',function(req,res){
			var username = req.body.email;
			var password = req.body.password;
			var firstName = req.body.firstName;
			var middleName = req.body.middleName;
			var lastName = req.body.lastName;
			var dateOfBirth = req.body.dateOfBirth;
			var dateOfJoining = req.body.dateOfJoining;
			var designation = req.body.designation;
			
			db.collection('employee').insertOne({'username':username,'password':password,'firstName':firstName,'middleName':middleName,'lastName':lastName,'dateOfBirth':dateOfBirth,'dateOfJoining':dateOfJoining,'designation':designation},function(err,r){
				assert.equal(null,err);
				console.log('Entry saved with _ID'+r.insertedId);
			});
			res.sendFile(path+'/views/login.html');
		});
		
		var server = app.listen(8002,function(){
			var port = server.address().port;
			console.log('express app running on port %s',port);
		});
	});