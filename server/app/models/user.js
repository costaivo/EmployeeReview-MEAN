var mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    constants = require('../libraries/constants');
this.config = require('../config/config.js');
var self = this;

var userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    firstName: String,
    middleName: String,
    lastName: String,
    salt: String,
    dateOfBirth: String,
    dateOfJoining: String,
    profilePic: String,
    designation: String,
    team: String,
    skills: String,
    rating: String,
    userLevel: { type: Number, min: 0, max: 10, default: 0 }
});

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + constants.normalTokenExpiry);
    return jwt.sign({
        _id: this._id,
        userName: this.userName,
        exp: parseInt(expiry.getTime() / 1000),
    }, self.config.secret); // DO NOT KEEP YOUR SECRET IN THE CODE!   
};

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.password === hash;
};


var user = mongoose.model('employees', userSchema);

module.exports = { User: user };
