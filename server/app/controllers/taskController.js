var task = function() {
    var task = require('../models/task').Task;
    var constants = require('../libraries/constants');
    var mongoosePaginate = require('mongoose-paginate');
    var User = require('../models/user').User;


    this.addTask = function(req, res) {
        this.newTask = new task({
            creatorId: req.payload._id,
            projectId: req.body.projectId
        });
        newTask.createdAt = new Date();
        newTask.updatedAt = new Date();

        newTask.userRating = req.body.userRating;
        newTask.taskName = req.body.taskName;
        newTask.description = req.body.description;
        newTask.save(function(error, data) {
            if (error)
                res.status(401).json({ message: constants.taskNotCreated });
            else {
                res.status(200).json({ taskID: data._id, message: constants.taskcreated });
            }
        });
    };

    this.addComment = function(req, res) {
        task.findOne({ _id: req.body.taskId }, function(error, task) {
            if (error)
                res.status(200).json({ message: error });
            else if (!task) {
                res.status(404).json({ message: "Task not Found" });
            } else {
                task.updatedAt = new Date();
                task.comments.push({
                    comment: req.body.comment,
                    userId: req.body._id,
                    commentedAt: new Date()
                });
                task.save(function(error, data) {
                    if (error)
                        console.log(error);
                    else {
                        console.log('Comment Added ');
                        res.status(200).json({ commentAddedBy: req.body._id });
                    }
                });
            }
        });
    };

    this.details = function(req, res) {
        var skip = JSON.parse(req.query.skip);
        var options = {
            sort: { updatedAt: -1 },
            lean: true,
            offset: skip,
            limit: 3
        };
        task.paginate({ "projectId": req.params.projectId, "creatorId": req.payload._id }, options).then(function(task, error) {
            if (error) {
                res.status(404).json({ message: error });
            } else {
                res.status(200).json({ tasks: task.docs, total: task.total });
            }
        });
    };


    this.hello = function(req, res) {
        console.log("Task Controller");
        res.status(200).json({ message: "Hello from Task controller" });
    };


}
module.exports.Task = task;
