/*
Description : This file is to handle all Skill related routes.
Author : Nikhil U

*/

var express = require('express'),
    router = express.Router(),
    jwt = require('express-jwt');


var skillController = new(require('../controllers/skillController')).Skill();

this.config = require('../config/config.js');

var auth = jwt({
    secret: this.config.secret,
    userProperty: 'payload'
});

router.get("/", auth, skillController.allSkills); // API to fetch all skills
router.get("/:skill", auth, skillController.searchSkill); // API to search for a skill in databse
router.post("/addOne", auth, skillController.addSkill); // API to add a skill in database


module.exports = router;
