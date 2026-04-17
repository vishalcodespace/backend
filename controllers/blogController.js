const Blog = require("../models/Blog");
const cloudinary = require("../config/cloudinary");

// Create - Add new blog post with image
exports.createBlog = async (req, res) => {
  try {
    const { title, description, author, imageBase64 } = req.body;

    // Validate required fields
    if (!title || !description || !author || !imageBase64) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description, author, and image",
      });
    }

    // Upload image to Cloudinary (using base64)
    const result = await cloudinary.uploader.upload(imageBase64, {
      folder: "blog_images",
      resource_type: "image",
    });

    // Create blog post
    const blog = new Blog({
      title,
      description,
      author,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      createDate: new Date(),
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating blog post",
      error: error.message,
    });
  }
};

// Read - Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createDate: -1 });
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blog posts",
      error: error.message,
    });
  }
};

// Read - Get single blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }
    
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blog post",
      error: error.message,
    });
  }
};

// Update - Update blog post (with optional image update)
exports.updateBlog = async (req, res) => {
  try {
    const { title, description, author, imageBase64 } = req.body;
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }
    
    // Update text fields
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (author) blog.author = author;
    
    // Update image if provided
    if (imageBase64) {
      // Delete old image from Cloudinary
      if (blog.image && blog.image.public_id) {
        await cloudinary.uploader.destroy(blog.image.public_id);
      }
      
      // Upload new image
      const result = await cloudinary.uploader.upload(imageBase64, {
        folder: "blog_images",
        resource_type: "image",
      });
      
      blog.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    
    await blog.save();
    
    res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating blog post",
      error: error.message,
    });
  }
};

// Delete - Delete blog post
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }
    
    // Delete image from Cloudinary
    if (blog.image && blog.image.public_id) {
      await cloudinary.uploader.destroy(blog.image.public_id);
    }
    
    // Delete blog from database
    await blog.deleteOne();
    
    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting blog post",
      error: error.message,
    });
  }
};