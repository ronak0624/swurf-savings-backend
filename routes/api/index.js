const router = require("express").Router();
const shiftRoutes = require("./shiftRoutes");
const savingGoalRoutes = require("./savingGoalRoutes");
const loginRoutes = require("../authentication");


router.use("/shifts", shiftRoutes);
router.use("/savings", savingGoalRoutes);


module.exports = router;