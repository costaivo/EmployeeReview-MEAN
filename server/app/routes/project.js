/*
Description : This file is to handle all projects related routes.
Author : Nikhil U

*/

var express = require('express'),
    router = express.Router(),
    jwt = require('express-jwt');


var projectController = new(require('../controllers/projectController')).Project();

this.config = require('../config/config.js');

var auth = jwt({
    secret: this.config.secret,
    userProperty: 'payload'
});

router.get("/", projectController.hello); //.. API to 
router.post("/add", projectController.addProject); //API to add new projects
router.get("/all", projectController.allProjects); //API to fetch all projects
// router.put("/task", taskController.addTask);
// router.put("/comment", taskController.addComment);

module.exports = router;
