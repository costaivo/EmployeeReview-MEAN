var express = require('express'),
    router = express.Router(),
    jwt = require('express-jwt');
userController = new(require('../controllers/userController')).User();
this.config = require('../config/config.js');

var auth = jwt({
    secret: this.config.secret,
    userProperty: 'payload'
});


router.post("/", userController.loginUser);
router.post("/register", userController.register);
router.post("/updateProfile", auth, userController.updateProfile);
router.get("/profile", auth, userController.profile);
router.post("/forgotPassword", userController.forgotPassword); //.. forgotPassword send email
router.post('/setNewPassword', auth, userController.setNewPassword); //.. Set new Password Password API


router.get("/", userController.hello);
router.get("/echo", userController.echo);
router.get("/:email", userController.getUserByEmail);

module.exports = router;
