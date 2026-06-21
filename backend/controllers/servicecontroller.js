const Service = require("../models/Service");

const createService = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    const service = await Service.create({
      title,
      description,
      price,
      category,
      provider: req.user._id,
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find().populate(
      "provider",
      "name email role"
    );

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "provider",
      "name email role"
    );

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    service.title = req.body.title || service.title;
    service.description =
      req.body.description || service.description;
    service.price = req.body.price || service.price;
    service.category =
      req.body.category || service.category;

    const updatedService = await service.save();

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    await service.deleteOne();

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};