var express= require('express'),
	router = express.Router();
	userController = new (require('../controllers/userController')).User();

	router.post("/",userController.loginUser);


	module.exports= router;