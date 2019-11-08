const router = require("express").Router();
const shiftController = require("../../controllers/shiftController");

//Routes for shifts:
router.route("/:username/shifts")
    .get(shiftController.findAllShifts)
    .put(shiftController.removeAllShifts)
    // .delete(shiftController.removeAllShifts)

router.route("/:username/shift/:id")
    .get(shiftController.findShiftById)
    // .put(shiftController.removeShiftById)

module.exports = router;
