const router = require("express").Router();
const shiftRoutes = require("./shiftRoutes");
const savingsGoalRoutes = require("./savingsGoalRoutes");
const loginRoutes = require("../authentication");


router.use("/shifts", shiftRoutes);
router.use("/savings", savingsGoalRoutes);


module.exports = router;