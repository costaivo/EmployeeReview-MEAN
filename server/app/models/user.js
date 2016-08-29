var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: {
		    type: String,
		    unique: true,
		    required: true
  		},
  	password:{
  			type:String,
  			required:true
  		},
  	firstName:String,
  	middleName:String,
  	lastName:String,
  	dateOfBirth:String,
  	dateOfJoining:String,
  	designation:String,
  	team:String,
  	skills:String,
  	rating:String
});

var user=mongoose.model('employees',userSchema);

module.exports = {User:user};