const router = require("express").Router();
const userController = require("../../controllers/userController");


//Routes for shifts:
router.route("/shifts/:username/")
    .get(userController.findAllShifts)
    .post(userController.postNewShift)

router.route("/shifts/:username/:id")
    .get(userController.findShiftById)
    .delete(userController.removeShift)


//Router for savingGoals:
router.route("/:username/savingGoals")
    .get(userController.findAllSavingGoals)
    .post(userController.postNewSavingGoal)

router.route("/:username/savingGoal/:id")
    .get(userController.findSavingGoalById)
    .delete(userController.removeSavingGoal)

module.exports = router;
