var express = require('express'),
	app = express(),
	engines = require('jade'),
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),	
	bodyParser = require('body-parser');	
	
	app.set('view engine','ejs');
	app.use(express.static('public'));
	app.use(bodyParser.urlencoded({extended:true}));
	
	MongoClient.connect('mongodb://localhost:27017/myapp',function(err,db){
		assert.equal(null,err);
		console.log('Sucessfully connected to mongodb server');
		
		app.get('/',function(req,res){
			res.render(__dirname+'/views/login',{errorMessage:""});
		});
		app.get('/login.html',function(req,res){
			res.render(__dirname+'/views/login',{errorMessage:""});
			
		});
		app.get('/registration.html',function(req,res){
			res.render(__dirname+'/views/registration',{});
		});
 		
		app.post('/incomingUser',function(req,res){
			var userName = req.body.email;
			var password = req.body.password;
			var cursor = db.collection('employee').find({"username":userName});
			cursor.each(function(err,data){
				if(err)
				{	console.log("error!!");
					res.render(__dirname+'/views/registration',{});
				}
				else if(data)
				{	if(password == data.password)
						{	res.render(__dirname+'/views/home',{});
						}
					else
						{	res.render(__dirname+'/views/login',{errorMessage:"Invalid password"});
						}
					if(userName!=data.username)
						{	res.render(__dirname+'/views/registration',{});
						}
				}
				else
					res.render(__dirname+'/views/registration',{});
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
			res.render(__dirname+'/views/login');
		});
		
		var server = app.listen(8001,function(){
			var port = server.address().port;
			console.log('express app running on port %s',port);
		});
	});