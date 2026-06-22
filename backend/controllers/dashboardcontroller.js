const User = require("../models/user");
const Service = require("../models/service");
const Booking = require("../models/Booking");

const customerDashboard = async (req, res) => {
  try {
    const customerId = req.user._id;

    const totalRequests = await Booking.countDocuments({ customer: customerId });

    const activeBookings = await Booking.countDocuments({
      customer: customerId,
      status: { $nin: ["completed", "delivered", "cancelled"] },
    });

    const completedProjects = await Booking.countDocuments({
      customer: customerId,
      status: { $in: ["completed", "delivered"] },
    });

    res.status(200).json({ totalRequests, activeBookings, completedProjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const providerDashboard = async (req, res) => {
  try {
    const providerId = req.user._id;

    const totalServices = await Service.countDocuments({ provider: providerId });

    // find services ids
    const services = await Service.find({ provider: providerId }).select("_id");
    const serviceIds = services.map((s) => s._id);

    const activeProjects = await Booking.countDocuments({
      service: { $in: serviceIds },
      status: { $nin: ["completed", "delivered", "cancelled"] },
    });

    const pendingRequests = await Booking.countDocuments({
      service: { $in: serviceIds },
      status: "pending",
    });

    res.status(200).json({ totalServices, activeProjects, pendingRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalBookings = await Booking.countDocuments();

    res.status(200).json({ totalUsers, totalServices, totalBookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { customerDashboard, providerDashboard, adminDashboard };
