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
			res.render(__dirname+'/views/login',{errorMessage:"",user:""});
		});
		app.get('/login.html',function(req,res){
			res.render(__dirname+'/views/login',{errorMessage:"",user:""});
			
		});
		app.get('/registration.html',function(req,res){
			res.render(__dirname+'/views/registration',{errorMessage:""});
		});
 		
		app.post('/incomingUser',function(req,res){
			var userName = req.body.email;
			var password = req.body.password;
			
			db.collection('employee').findOne({"username":userName},function(err,data){
			 	if(data)
			 	{	if(password == data.password)
						{	res.render(__dirname+'/views/profilePage',{user:userName,firstName:data.firstName});
						}
					else
						{	res.render(__dirname+'/views/login',{errorMessage:"Invalid password",user:userName});
						}
			 		
			 	}
			 	else
			 	{
			 		res.render(__dirname+'/views/login',{errorMessage:"Invalid Username & password",user:""})
			 	}
			 });								
		});
		
		app.post('/registrationdetails',function(req,res){
			var userName = req.body.email;
			var password = req.body.password;
			var confirmpassword = req.body.confirmpassword;
			db.collection('employee').findOne({"username":userName},function(err,data){
				if(data)
				{
					if(userName==data.username)
					{	res.render(__dirname+'/views/registration',{errorMessage:"Username not available"});
					}
					
				}
				else if(password!=confirmpassword)	
					{	res.render(__dirname+'/views/registration',{errorMessage:"Passwords dosent match"});

					}		
					else
					{	db.collection('employee').insertOne({'username':userName,'password':password},function(err,r){
							assert.equal(null,err);
							console.log('Entry saved with _ID'+r.insertedId);
						});
						res.render(__dirname+'/views/login',{user:userName,errorMessage:""});
					}
			});			
		});

		app.post('/update',function(req,res){
			var username = req.body.email;
			var firstName = req.body.firstName;
			var middleName = req.body.middleName;
			var lastName = req.body.lastName;
			var dateOfBirth = req.body.dateOfBirth;
			var dateOfJoining = req.body.dateOfJoining;
			var designation = req.body.designation;
			var team = req.body.teamName;
			var skill = req.body.skills;
			
			db.collection('employee').updateOne({'username':username},{$set:{'firstName':firstName,'middleName':middleName,'lastName':lastName,'dateOfBirth':dateOfBirth,'dateOfJoining':dateOfJoining,'designation':designation,'team':team,'skils':skill}},function(err,r){
				assert.equal(null,err);
			});

			res.render(__dirname+'/views/login',{user:"",errorMessage:""});
		});
		
		var server = app.listen(8001,function(){
			var port = server.address().port;
			console.log('express app running on port %s',port);
		});
	});