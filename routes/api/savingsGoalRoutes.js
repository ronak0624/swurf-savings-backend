const router = require("express").Router();
const savingGoalController = require("../../controllers/savingGoalController");

//Router for savingGoals:
// router.route("/goals")
//     .get(savingGoalController.findAllSavingGoals)

router.route("/goals")
    .get(savingGoalController.validSavingsGoals)
    .post(savingGoalController.newSavingsGoal)
    .delete(savingGoalController.removeAllSavingsGoals)

router.route("/goals/active/:id").get(savingGoalController.toggleActive)

//Router for savingGoal:
router.route("/goals/:id")
    .get(savingGoalController.findSavingGoalById)
    .delete(savingGoalController.deleteSavingGoalById)

module.exports = router;
