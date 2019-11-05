const router = require("express").Router();
const shiftsController = require("../../controllers/shiftsController");

router.route("/:username/shifts")
    .get(shiftsController.findAll)
    .post(shiftsController.create)
    .delete(shiftsController.remove)

router.route("/:username/shift/:id")
    .get(shiftsController.findById(id))
    .delete(shiftsController.remove(id))

module.exports = router;
