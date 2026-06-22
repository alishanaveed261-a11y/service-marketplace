const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getProviderBookings,
  updateBookingStatus,
} = require("../controllers/bookingcontroller");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  authorizeRoles("customer"),
  createBooking
);
router.get("/my-bookings", protect, getMyBookings);
router.get("/provider", protect, authorizeRoles("provider"), getProviderBookings);
router.put("/:id/cancel", protect, cancelBooking);
router.put("/:id/status", protect, authorizeRoles("provider"), updateBookingStatus);

module.exports = router;