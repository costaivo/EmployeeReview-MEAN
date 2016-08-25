var User=function()
{	
	var User = require('../models/user').User;

	this.loginUser=function(req,res){
		//passport module
		var email=req.email;
		var password=req.password;
		User.findOne({"username":email},function(err,data){
			 	if(password==data.password)
			 	{	res.status(200).json({user:data});		}
			 	else
			 	{	res.status(404);	}
			 });
	};
}
module.exports.User = User;