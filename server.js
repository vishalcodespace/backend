const express = require("express");
const connectDB = require("./db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const faqRoutes = require("./routes/faqRoutes"); // New FAQ routes

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api", faqRoutes); // FAQ routes added here

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "API Server is running",
    endpoints: {
      auth: "/api/auth",
      admin: "/api/admin",
      user: "/api/user",
      faq: "/api/faqs"
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Connect DB + Start Server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log("Failed to connect to database:", err);
    process.exit(1);
  });