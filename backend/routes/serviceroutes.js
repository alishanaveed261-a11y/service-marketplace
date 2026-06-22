const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", getServices);
router.get("/:id", getServiceById);
router.post(
  "/",
  protect,
  authorizeRoles("provider"),
  createService
);
router.put("/:id", protect, updateService);
router.delete("/:id", protect, deleteService);
router.put(
  "/:id",
  protect,
  authorizeRoles("provider"),
  updateService
);

module.exports = router;