const router = require("express").Router();
const savingGoalController = require("../controllers/savingGoalController");

//Router for savingGoals:
router.route("/:username/allSavingGoals")
    .get(savingGoalController.findAllSavingGoals)

router.route("/:username/savingGoals")
    .get(savingGoalController.findAllValidSavingGoals)
    .post(savingGoalController.postNewSavingGoal)
    .delete(savingGoalController.removeAllSavingGoals)

//Router for savingGoal:
router.route("/:username/savingGoal/:id")
    .get(savingGoalController.findSavingGoalById)
    .delete(savingGoalController.deleteSavingGoalById)

module.exports = router;
