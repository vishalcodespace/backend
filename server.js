const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");

// Load environment variables FIRST
dotenv.config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const faqRoutes = require("./routes/faqRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api", faqRoutes);
app.use("/api", blogRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "API Server is running",
    endpoints: {
      auth: "/api/auth",
      admin: "/api/admin",
      user: "/api/user",
      faq: "/api/faqs",
      blog: {
        create: "POST /api/blogs",
        getAll: "GET /api/blogs",
        getOne: "GET /api/blogs/:id",
        update: "PUT /api/blogs/:id",
        delete: "DELETE /api/blogs/:id"
      }
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