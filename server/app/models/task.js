var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    constants = require('../libraries/constants');
this.config = require('../config/config.js');
var self = this;

var taskSchema = new mongoose.Schema({
    creatorId: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    supervisorRating: String,
    taskName: String,
    description: String,
    userRating: String,
    comments: [{
        userId: String,
        commentedAt: { type: Date, default: Date.now },
        comment: String,
        isVisible: { type: Boolean, default: false }
    }]

});

var task = mongoose.model('tasks', taskSchema);
module.exports = { Task: task };
