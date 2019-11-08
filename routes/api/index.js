const router = require("express").Router();
const shiftRoutes = require("./shiftRoutes");
const savingGoalRoutes = require("./savingGoalRoutes");


router.use("/", shiftRoutes);
router.use("/", savingGoalRoutes);


module.exports = router;
