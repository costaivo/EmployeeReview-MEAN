var express = require('express'),
	app = express(),
	engines = require('consolidate'),
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	bodyParser = require('body-parser');
	
	app.engine('html',engines.nunjucks);
	app.set('view engine','html');
	app.set('views',__dirname+'/views');
	app.use(bodyParser.urlencoded({extended:true}));
	
	MongoClient.connect('mongodb://localhost:27017/myapp',function(err,db){
		assert.equal(null,err);
		console.log('Sucessfully connected to mongodb server');
		
		app.get('/',function(req,res){
			res.render('registration',{});
		});
		app.post('/registrationdetails',function(req,res){
			var username = req.body.email;
			var password = req.body.password;
			var firstName = req.body.firstName;
			var middleName = req.body.middleName;
			var lastName = req.body.lastName;
			var dateOfBirth = req.body.dateOfBirth;
			var dateOfJoining = req.body.dateOfJoining;
			
			db.collection('employee').insertOne({'username':username,'password':password,'firstName':firstName,'middleName':middleName,'lastName':lastName,'dateOfBirth':dateOfBirth,'dateOfJoining':dateOfJoining},function(err,r){
				assert.equal(null,err);
				console.log('Entry saved with _ID'+r.insertedId);
			});
		});
		
		var server=app.listen(8000,function(){
			var port = server.address().port;
			console.log('express app runnig on port %s',port);
		});
	});