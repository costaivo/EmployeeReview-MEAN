/*
Description : This controller is to handle Skill related requests.
    Add all skill related functions here.
Author : Nikhil U

*/
var Skill = function() {
    var Skill = require('../models/skill').Skill;
    var constants = require('../libraries/constants');

    this.allSkills = function(req, res) {
        if (!req.payload._id) {
            res.status(401).json({
                message: constants.unAuthorizedAccess
            });
        } else {
            Skill.find({}).lean().exec(function(error, data) {
                return res.status(200).json({ skills: data });
            })
        }
    };

    this.searchSkill = function(req, res) {
        if (!req.payload._id) {
            res.status(401).json({
                message: constants.unAuthorizedAccess
            });
        } else {
            var search = req.params.skill + '.*';

            Skill.find({ "skill": { "$regex": search, "$options": "i" } }).lean().exec(function(error, data) {
                return res.status(200).json({ skills: data });
            })
        }
    };

    this.addSkill = function(req, res) {
        if (!req.payload._id) {
            res.status(401).json({
                message: constants.unAuthorizedAccess
            });
        } else {
            var data = req.body.skill;
            var skill = data.toUpperCase();
            this.newSkill = new Skill({
                skill: skill
            });
            Skill.findOne({ "skill": skill }, function(error, data) {
                if (error) {
                    res.status(401).json({ message: error });
                }
                if (!data) { //insert new entry in database

                    newSkill.save(function(error, data) {
                        if (error)
                            console.log(error);
                        else {
                            console.log('Entry saved as: ', data);
                            res.status(200).json({ skill: data });
                        }
                    });

                } else {
                    console.log("Skills present in database");
                    res.status(401).json({ message: constants.skillPresentInDatabase });
                }

            });
        }
    };


}
module.exports.Skill = Skill;
