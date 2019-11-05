const router = require("express").Router();
const savingsController = require("../../controllers/savingsController");

router.route("/:username/savings")
    .get(savingsController.findAll)
    .post(savingsController.create)
    .delete(savingsController.remove)
    
router.route("/:username/saving/:id")
    .get(savingsController.findById(id))
    .delete(savingsController.remove(id))

module.exports = router;
