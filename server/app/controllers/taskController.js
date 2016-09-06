var task = function() {
    var task = require('../models/task').Task;
    var constants = require('../libraries/constants');
    var User = require('../models/user').User;


    this.addTask = function(req, res) {
        this.newTask = new task({
            creatorId: req.body._id,
            projectId: "1"
        });
        newTask.createdAt = new Date();
        newTask.updatedAt = new Date();

        newTask.userRating = req.body.userRating;
        newTask.comments.push({
            comment: req.body.comment,
            userId: req.body._id,
            commentedAt: new Date()
        });
        newTask.save(function(error, data) {
            if (error)
                console.log(error);
            else {
                console.log('Entry saved as: ', data);
                res.status(200).json({ taskID: data._id });
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


    this.hello = function(req, res) {
        console.log("Task Controller");
        res.status(200).json({ message: "Hello from Task controller" });
    };


}
module.exports.Task = task;
