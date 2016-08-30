var Skill = function() {
    var Skill = require('../models/skill').Skill;

    this.allSkills = function(req, res) {
        Skill.find({}).lean().exec(function(err, data) {
            return res.status(200).json({ skills: data });
        })
    };

    this.searchSkill = function(req, res) {
        var search = req.params.skill + '.*';

        Skill.find({"skill":{"$regex":search,"$options":"i"}}).lean().exec(function(err, data) {
            return res.status(200).json({ skills: data });
        })
    };

    this.addSkill = function(req, res) {
        var data = req.body.skill;
        var skill = data.toUpperCase();
        this.newSkill = new Skill({
            skill: skill
        });
        Skill.findOne({ "skill": skill }, function(err, data) {
            if (err) {
                res.status(401).json({ message: err });
            }
            if (!data) { //insert new entry in database

                newSkill.save(function(err, data) {
                    if (err)
                        console.log(err);
                    else {
                        console.log('Entry saved as: ', data);
                        res.status(200).json({ skill: data });
                    }
                });

            } else {
                console.log("Skills present in database");
                res.status(401).json({ message: "already present in database" });
            }

        });
    };



    this.hello = function(req, res) {
        console.log("Hello from skillController");
        res.send("SkillController");
    };
}
module.exports.Skill = Skill;
