const Service = require("../models/Service");
//const cloudinary = require("../config/cloudinary");

// Create Service
exports.createService = async (req, res) => {
  try {
    const {
      name,
      serviceType,
      price,
      duration,
      contact,
      location,
      availableDays,
    } = req.body;

    let imageUrls = [];

    if (req.files) {
      for (let file of req.files) {
       // const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
    }

    const service = await Service.create({
      name,
      serviceType,
      price,
      duration,
      contact,
      location,
      availableDays,
      images: imageUrls,
      adminId: req.user.id,
    });

    res.json(service);
  } catch (err) {
    res.status(500).json(err);
  }
};