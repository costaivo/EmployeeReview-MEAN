var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    constants = require('../libraries/constants');
this.config = require('../config/config.js');
var self = this;

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    middleName: String,
    lastName: String,
    dateOfBirth: String,
    dateOfJoining: String,
    designation: String,
    team: String,
    skills: String,
    rating: String
});

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + constants.normalTokenExpiry);
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000),
    }, self.config.secret); // DO NOT KEEP YOUR SECRET IN THE CODE!   
};

var user = mongoose.model('employees', userSchema);

module.exports = { User: user };
