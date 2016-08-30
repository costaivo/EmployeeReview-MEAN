var mongoose = require('mongoose');

var skillSchema = new mongoose.Schema({
    skill: {
        type: String,
        unique: true,
        required: true
    }
});

var skill = mongoose.model('skills', skillSchema);

module.exports = { Skill: skill };
