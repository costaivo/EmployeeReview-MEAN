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
router.put("/add", auth, taskController.addTask);
router.put("/comment", taskController.addComment);
router.get("/:projectId", auth, taskController.details); // API to get task details by searching Project ID

module.exports = router;
