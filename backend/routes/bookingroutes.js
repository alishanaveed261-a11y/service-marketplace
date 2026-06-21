const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  authorizeRoles("customer"),
  createBooking
);
router.get("/my-bookings", protect, getMyBookings);
router.put("/:id/cancel", protect, cancelBooking);

module.exports = router;