var express = require('express'),
    router = express.Router(),
    jwt = require('express-jwt');
userController = new(require('../controllers/userController')).User();
this.config = require('../config/config.js');

var auth = jwt({
    secret: this.config.secret,
    userProperty: 'payload'
});


router.post("/", userController.loginUser); //.. Login API
router.post("/register", userController.register); //.. Registering new user API
router.post("/updateProfile", auth, userController.updateProfile); //.. updating Profile API
router.get("/profile", auth, userController.profile); //.. API to fetch profile details
router.post("/forgotPassword", userController.forgotPassword); //.. forgotPassword send email
router.post('/setNewPassword', auth, userController.setNewPassword); //.. Set new Password API
router.put('/addPicture', auth, userController.uploadProfilePic); //.. Edit profile picture API


router.get("/", userController.hello);
router.get("/echo", userController.echo);
router.get("/:email", userController.getUserByEmail);

module.exports = router;
