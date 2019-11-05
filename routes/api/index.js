const router = require("express").Router();
const plaidRoutes = require("./plaid");
const savingsRoutes = require("./savings");
const shiftsRoutes = require("./savings");
const userRoutes = require("./savings");

// Book routes
router.use("/plaid", plaidRoutes);
router.use("/savings", savingsRoutes);
router.use("/shifts", shiftsRoutes);
router.use("/user", userRoutes);

module.exports = router;
