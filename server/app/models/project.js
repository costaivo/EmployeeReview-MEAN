var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    constants = require('../libraries/constants');
this.config = require('../config/config.js');
var self = this;

var projectSchema = new mongoose.Schema({
    creatorId: String,
    updatedBy: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    description: String,
    projectName: String,
    clientDetails: String

});

var project = mongoose.model('projects', projectSchema);
module.exports = { Project: project };
