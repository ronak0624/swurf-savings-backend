const router = require("express").Router();
const shiftController = require("../../controllers/shiftController");

// //Routes for shifts:
// router.route("/:username/allShifts")
//     .get(shiftController.findAllShifts)

router.route("/")
    .get(shiftController.findAllShifts)
    .post(shiftController.newShift)
    .delete(shiftController.removeAllShifts)

//Routes for shift:
router.route("/:username/shift/:id")
    .get(shiftController.findShiftById)
    .delete(shiftController.deleteShiftById)

module.exports = router;
