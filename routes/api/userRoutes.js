const router = require("express").Router();
const userController = require("../../controllers/userController");


//Routes for shifts:
router.route("/:username/shifts")
    .get(userController.findAllShifts)
    // .post(userController.postNewShift)

router.route("/:username/shift/:id")
    .get(userController.findShiftById)
//     .delete(userController.removeShift)


// //Router for savingGoals:
router.route("/:username/savingGoals")
    .get(userController.findAllSavingsGoals)
//     .post(userController.postNewSavingGoal)

// router.route("/:username/savingGoal/:id")
//     .get(userController.findSavingGoalById)
//     .delete(userController.removeSavingGoal)

module.exports = router;
