const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authmiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");
const {
  customerDashboard,
  providerDashboard,
  adminDashboard,
} = require("../controllers/dashboardcontroller");

router.get("/customer", protect, authorizeRoles("customer"), customerDashboard);
router.get("/provider", protect, authorizeRoles("provider"), providerDashboard);
router.get("/admin", protect, authorizeRoles("admin"), adminDashboard);

module.exports = router;
