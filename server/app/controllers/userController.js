var User = function() {
    var User = require('../models/user').User;
    var constants = require('../libraries/constants');
    this.config = require('../config/config.js');
    var self = this;

    this.loginUser = function(req, res) {

        var email = req.body.email;
        var password = req.body.password;
        var token;
        //passport module

        User.findOne({ "username": email }, function(err, data) {
            if (err) {
                res.status(401).json({ message: constants.invalidUser });
            }
            if (!data) {
                res.status(401).json({ message: constants.invalidUser });
            } else if (password == data.password) { //generating token
                token = data.generateJwt();
                res.status(200).json({ token: token });
            } else { res.status(401).json({ message: constants.incorrectPassword }); }
        });

    };

    this.register = function(req, res) {

        var newUser = new User({
            username: req.body.email,
            password: req.body.password
        });

        User.findOne({ "username": req.body.email }, function(err, data) {
            if (err) {
                res.status(401).json({ message: err });
                console.log("error");
            }
            if (!data) { //insert new entry in database

                newUser.save(function(err, data) {
                    if (err)
                        console.log(err);
                    else {
                        console.log('Entry saved as: ', data);
                        res.status(200).json({ user: data });
                    }
                });

            } else {
                console.log("username exists");
                res.status(401).json({ message: constants.emailAlreadyTaken });
            }

        });
    };

    this.updateProfile = function(req, res) {

        User.findOne({ "username": req.body.email }, function(err, data) {
            if (err) {
                res.status(401).json({ message: err });
                console.log(err);
            }
            if (!data) {
                res.status(404).json({ message: constants.invalidUser });
                console.log("User not found");
            } else { //update one
                data.firstName = req.body.firstName;
                data.middleName = req.body.middleName;
                data.lastName = req.body.lastName;
                data.dateOfBirth = req.body.birthDate;
                data.dateOfJoining = req.body.joiningDate;
                data.designation = req.body.designation;
                data.team = req.body.team;
                data.skills = req.body.skills;
                data.save(function(err) {
                    if (err)
                        console.log(err);
                    else {
                        console.log("Updated");
                        res.status(200).json({ message: constants.userUpdated });
                    }
                });
            }
        });
    };

    this.profile = function(req, res) {
        if (!req.payload._id) {
            console.log("Token error in profile API");
            res.status(401).json({
                message: constants.unAuthorizedAccess
            });
        } else {
            //find user and send data
            User.findOne({ "username": req.payload.email }, function(err, data) {
                if (err)
                    console.log(err);
                else if (data)
                    res.status(200).json({ user: data });
                else
                    res.status(404).json({ message: constants.userNotFound });
            });
        }
    };



    this.getUserByEmail = function(req, res) {
        User.findOne({ "username": req.params.email }, function(err, data) {
            if (err)
                console.log(err);
            else if (data)
                res.status(200).json({ user: data });
            else
                res.status(404).json({ message: constants.userNotFound });
        });
    };

    this.hello = function(req, res) {
        console.log("Hello from userController");
        res.send("UserController");
    };

    this.echo = function(req, res) {
        console.log("Hello from userController (echo)");
        res.status(200).json({ echo: "Hello" });
    };

}
module.exports.User = User;
