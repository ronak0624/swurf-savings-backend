const router = require("express").Router();
const shiftsController = require("../../controllers/shiftsControllers");

router.route("/:username/shifts")
    .get(shiftsController.findAll)
    .post(shiftsController.create)
    .delete(shiftsController.remove)

router.route("/:username/shift/:id")
    .get(shiftsController.findById(params.id))
    .delete(shiftsController.remove(params.id))

module.exports = router;
