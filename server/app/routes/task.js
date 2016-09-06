/*
Description : This file is to handle all task related routes.
Author : Nikhil U

*/

var express = require('express'),
    router = express.Router(),
    jwt = require('express-jwt');


var taskController = new(require('../controllers/taskController')).Task();

this.config = require('../config/config.js');

var auth = jwt({
    secret: this.config.secret,
    userProperty: 'payload'
});

router.get("/", taskController.hello); //.. API to 
router.put("/task", taskController.addTask);
router.put("/comment", taskController.addComment);

//router.put("/task", auth, taskController.addTask);


// router.get("/:skill", auth, skillController.searchSkill); //.. API to 
// router.post("/addOne", auth, skillController.addSkill); //.. API to 


module.exports = router;
