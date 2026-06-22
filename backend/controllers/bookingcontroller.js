const Booking = require("../models/Booking");
const Service = require("../models/service");

const createBooking = async (req, res) => {
  try {
    const { service } = req.body;

    const booking = await Booking.create({
      customer: req.user._id,
      service,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customer: req.user._id,
    }).populate("service");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProviderBookings = async (req, res) => {
  try {
    // Find services owned by provider
    const services = await Service.find({ provider: req.user._id }).select("_id");
    const serviceIds = services.map((s) => s._id);

    const bookings = await Booking.find({ service: { $in: serviceIds } }).populate("service");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id).populate("service");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only provider who owns the service can update status
    if (req.user.role !== "provider" || String(booking.service.provider) !== String(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Validate status is allowed by schema enum
    const allowed = [
      "pending",
      "accepted",
      "in_progress",
      "completed",
      "delivered",
      "cancelled",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: "Status updated", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = "cancelled";

    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
  getProviderBookings,
  updateBookingStatus,
};