var express= require('express'),
	router = express.Router();
	userController = new (require('../controllers/userController')).User();

	router.post("/",userController.loginUser);
	router.post("/register",userController.register);
	router.post("/updateProfile",userController.updateProfile);
	router.get("/",userController.hello);
	router.get("/echo",userController.echo);
	router.get("/:email", userController.getUserByEmail);

	module.exports= router;