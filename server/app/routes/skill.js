var express = require('express'),
    router = express.Router();


var skillController = new(require('../controllers/skillController')).Skill();

router.get("/", skillController.allSkills);
router.get("/:skill", skillController.searchSkill);
router.post("/addOne", skillController.addSkill);


module.exports = router;
