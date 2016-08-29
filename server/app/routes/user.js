var express= require('express'),
	router = express.Router();
	userController = new (require('../controllers/userController')).User();

	router.post("/",userController.loginUser);
	router.post("/register",userController.register);
	router.get("/",userController.hello);
	router.get("/echo",userController.echo);

	module.exports= router;