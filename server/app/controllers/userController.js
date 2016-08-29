var User=function()
{	
	var User = require('../models/user').User;
	var constants = require('../libraries/constants');

	this.loginUser=function(req,res){

		var email=req.body.email;
		var password=req.body.password;
		//passport module

		User.findOne({"username":email},function(err,data){
				if(err)
				{	res.status(401).json({message:constants.invalidUser});	
				}
				if(!data)
				{
					res.status(401).json({message:constants.invalidUser});
				}
			 	else if(password==data.password)
			 	{	res.status(200).json({user:data});		}
			 	else
			 	{	res.status(401).json({message:constants.incorrectPassword});	}
			 });

	};

	this.register = function(req,res){
		// var email=req.body.email;
		// var password=req.body.password;

		var newUser= new User({
			username:req.body.email,
			password:req.body.password
		});

		User.findOne({"username":req.body.email},function(err,data){
				if(err)
				{	res.status(401).json({message:err});
					console.log("error");	
				}
				if(!data)
				{	//insert new entry in database
					
					newUser.save(function(err,data){
							if(err)
								console.log(err);
							console.log('Entry saved as: ',data);
					});
					
				}
			 	else 
			 	{	console.log("username exists");
			 		res.status(401).json({message:constants.emailAlreadyTaken});
				}
			 	
			 });
	};

	this.updateProfile=function(req,res){
		var updateUser= new User({
			username:req.body.email,
			password:req.body.password
		});
		User.findOne({"username":req.body.email},function(err,data){
			if(err)
			{	res.status(401).json({message:err});
				console.log(err);
			}
			if(!data)
			{	res.status(404).json({message:constants.invalidUser});
				console.log("User not found");
			}
			else
			{	//update one
				data.firstName=req.body.firstName;
				data.middleName=req.body.middleName;
				data.lastName=req.body.lastName;
				data.dateOfBirth=req.body.birthDate;
				data.dateOfJoining=req.body.joiningDate;
				data.designation=req.body.designation;
				data.team=req.body.team;
				data.skills=req.body.skills;
				data.save(function(err){
					if(err)
						console.log(err);
					else
					{	console.log("Updated");
						res.status(200).json({message:"Updated"});
					}
				});
			}
		});
	};

	this.hello = function (req,res) {
		console.log("Hello from userController");
		res.send("UserController");
	};

	this.echo = function (req,res) {
		console.log("Hello from userController (echo)");
		res.status(200).json({echo : "Hello"}); 
	};

}
module.exports.User = User;