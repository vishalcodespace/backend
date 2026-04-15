const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: String,
  serviceType: String,
  price: Number,
  duration: String,
  contact: String,
  location: String,
  availableDays: [String],
  images: [String],
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

module.exports = mongoose.model("Service", serviceSchema);