var project = function() {
    var project = require('../models/project').Project;
    var constants = require('../libraries/constants');
    var User = require('../models/user').User;


    this.addProject = function(req, res) {

        project.findOne({ "projectName": req.body.projectName }, function(error, data) {
            if (error) {
                res.status(401).json({ message: error });
            }
            if (data) {
                res.status(401).json({ message: constants.projectAlreadyPresent });
            } else {
                this.newProject = new project();
                newProject.creatorId = req.body._id;
                newProject.updatedBy = req.body._id;
                newProject.createdAt = new Date();

                newProject.updatedAt = new Date();
                newProject.description = req.body.description;
                newProject.projectName = req.body.projectName;
                newProject.clientDetails = req.body.clientDetails;
                newProject.save(function(error, data) {
                    if (error)
                        console.log(error);
                    else {
                        console.log('Entry saved as: ', data);
                        res.status(200).json({ projectID: data._id });
                    }
                });
            }
        });

    };

    this.allProjects = function(req, res) {
        project.find({}).lean().exec(function(error, project) {
            return res.status(200).json({ projects: project });
        })
    };


    this.hello = function(req, res) {
        console.log("Task Controller");
        res.status(200).json({ message: "Hello from project controller" });
    };


}
module.exports.Project = project;
