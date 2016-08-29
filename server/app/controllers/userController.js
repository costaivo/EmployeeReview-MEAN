var User=function()
{	
	var User = require('../models/user').User;

	this.loginUser=function(req,res){

		var email=req.body.email;
		var password=req.body.password;
		//passport module


		User.findOne({"username":email},function(err,data){
				if(err)
				{	res.status(401).json({message:"Invalid User"});	
				}
				if(!data)
				{
					res.status(401).json({message:"Invalid User"});
				}
			 	else if(password==data.password)
			 	{	console.log(data);
			 		res.status(200).json({user:data});		}
			 	else
			 	{	res.status(401).json({message:"Incorrect password"});	}
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