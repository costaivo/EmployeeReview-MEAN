var User = function() {
    var User = require('../models/user').User;
    var constants = require('../libraries/constants');
    var crypto = require('crypto');
    var nodeMailer = require('nodemailer');
    var path = require('path');
    var EmailTemplate = require('email-templates').EmailTemplate;
    var templatesDir = path.resolve(__dirname, '../..', 'public/templates/emailTemplates');


    this.config = require('../config/config.js');
    var self = this;

    this.transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: 'presley.cci@gmail.com',
            pass: 'Slaay1988cc'
        }
    });

    this.loginUser = function(req, res) {
        var token;
        //passport module

        User.findOne({ "userName": req.body.userName }, function(error, data) {
            if (error) {
                res.status(401).json({ message: constants.invalidUser });
            }
            if (!data) {
                res.status(401).json({ message: constants.invalidUser });
            } else if (data.validPassword(req.body.password)) {
                token = data.generateJwt();
                res.status(200).json({ token: token });
            } else { res.status(401).json({ message: constants.incorrectPassword }); }
        });

    };

    this.register = function(req, res) {
        User.findOne({ "userName": req.body.userName }, function(error, data) {
            if (error) {
                res.status(401).json({ message: error });
            }
            if (data) {
                res.status(401).json({ message: constants.emailAlreadyTaken });
            } else {
                var newUser = new User();
                newUser.userName = req.body.userName;
                newUser.setPassword(req.body.password);
                newUser.save(function(error, data) {
                    if (error)
                        console.log(error);
                    else {
                        console.log('Entry saved as: ', data);
                        res.status(200).json({ userID: data._id });
                    }
                });
            }

        });
    };

    this.updateProfile = function(req, res) {
        if (!req.payload._id) {
            res.status(401).json({
                message: constants.unAuthorizedAccess
            });
        } else {
            User.findOne({ "userName": req.payload.userName }, function(error, data) {
                if (error) {
                    res.status(401).json({ message: error });
                    console.log(error);
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
                    data.save(function(error) {
                        if (error)
                            console.log(error);
                        else {
                            res.status(200).json({ message: constants.userUpdated });
                        }
                    });
                }
            });
        }
    };

    this.profile = function(req, res) {
        if (!req.payload._id) {
            res.status(401).json({
                message: constants.unAuthorizedAccess
            });
        } else {
            //find user and send data
            User.findOne({ "userName": req.payload.userName }, function(error, data) {
                if (error)
                    console.log(error);
                else if (data)
                    res.status(200).json({ user: data });
                else
                    res.status(404).json({ message: constants.userNotFound });
            });
        }
    };

    this.forgotPassword = function(req, res) {
        User.findOne({ "userName": req.body.userName }, function(error, userInfo) {
            if (error) {
                console.log(error);
            }
            if (!userInfo) {
                return res.status(404).json({ message: constants.emailDoesntExist });
            }
            if (userInfo) {
                var token = userInfo.generateJwt();
                var mailOptions = {
                    userName: userInfo.userName,
                    name: {
                        first: userInfo.firstName,
                        last: userInfo.lastName
                    },
                    appHost: self.config.appHost,
                    token: token
                };

                var emailTemplate = new EmailTemplate(path.join(templatesDir, 'forgotPassword'));

                emailTemplate.render(mailOptions, function(error, results) {
                    if (error) return res.status(500).json({ message: constants.emailNotSent });
                    self.transporter.sendMail({
                        from: constants.fromEmailID, // sender address
                        to: mailOptions.userName, // list of receivers
                        subject: constants.resetPasswordMessage,
                        html: results.html
                    }, function(error, responseStatus) {
                        if (error) res.status(500).json({ message: constants.emailNotSent });
                        res.status(200).json({ message: constants.emailSent });
                    })
                });
            }
        })
    };

    this.setNewPassword = function(req, res) {
        if (!req.payload._id) {
            res.status(401).json({ message: constants.unAuthorizedAccess });
        } else {
            User.findOne({ "userName": req.payload.userName }, function(error, data) {
                if (error)
                    console.log(error);
                else if (data) {
                    data.setPassword(req.body.password);
                    data.save(function(error) {
                        if (error)
                            console.log(error);
                        else {
                            res.status(200).json({ message: constants.userPasswordUpdated });
                        }
                    });
                } else {
                    res.status(404).json({ message: constants.userNotFound });
                }
            });

        }
    };


    this.getUserByEmail = function(req, res) {
        User.findOne({ "userName": req.params.email }, function(error, data) {
            if (error)
                console.log(error);
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
