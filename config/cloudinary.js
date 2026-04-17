const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Debug logging (remove after testing)
console.log("Loading Cloudinary Config:");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME || "Not set");
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "✓ Set (length: " + process.env.CLOUDINARY_API_KEY.length + ")" : "✗ Missing");
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "✓ Set (length: " + process.env.CLOUDINARY_API_SECRET.length + ")" : "✗ Missing");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verify configuration
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("⚠️ Warning: Cloudinary credentials are incomplete!");
} else {
  console.log("✅ Cloudinary configured successfully");
}

module.exports = cloudinary;