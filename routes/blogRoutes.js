const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// Create - POST
router.post("/blogs", createBlog);

// Read - GET all
router.get("/blogs", getAllBlogs);

// Read - GET single
router.get("/blogs/:id", getBlogById);

// Update - PUT
router.put("/blogs/:id", updateBlog);

// Delete - DELETE
router.delete("/blogs/:id", deleteBlog);

module.exports = router;