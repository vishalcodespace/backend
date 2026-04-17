const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Use environment variable for MongoDB connection
    const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/taskDB";
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected Successfully");
    return true;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

module.exports = connectDB;