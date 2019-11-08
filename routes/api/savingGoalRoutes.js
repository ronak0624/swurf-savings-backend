const router = require("express").Router();
const savingGoalController = require("../../controllers/savingGoalController");

//Router for savingGoals:
router.route("/:username/savingGoals")
    .get(savingGoalController.findAllSavingsGoals)
    // .put(savingGoalController.updateSavingGoals)

router.route("/:username/savingGoal/:id")
    .get(savingGoalController.findSavingGoalById)
    // .put(savingGoalController.updateSavingGoal)

module.exports = router;
