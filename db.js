const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/taskDB");
    console.log("MongoDB Connected Successfully");
    return true;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

module.exports = connectDB;