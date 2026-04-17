const FAQ = require("../models/FAQ");

// Create - Add new FAQ
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Check if FAQ already exists
    const existingFAQ = await FAQ.findOne({ question });
    if (existingFAQ) {
      return res.status(400).json({
        success: false,
        message: "FAQ with this question already exists",
      });
    }

    const faq = new FAQ({ question, answer });
    await faq.save();

    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating FAQ",
      error: error.message,
    });
  }
};

// Read - Get all FAQs
exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching FAQs",
      error: error.message,
    });
  }
};

// Read - Get single FAQ by ID
exports.getFAQById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    res.status(200).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching FAQ",
      error: error.message,
    });
  }
};

// Update - Full update (PUT)
exports.updateFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true, runValidators: true }
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating FAQ",
      error: error.message,
    });
  }
};

// Patch - Partial update
exports.patchFAQ = async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ["question", "answer"];
    const isValidOperation = Object.keys(updates).every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        message: "Invalid updates! Only question and answer can be updated",
      });
    }

    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    // Apply partial updates
    Object.keys(updates).forEach((key) => {
      faq[key] = updates[key];
    });

    await faq.save();

    res.status(200).json({
      success: true,
      message: "FAQ patched successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error patching FAQ",
      error: error.message,
    });
  }
};

// Delete - Remove FAQ
exports.deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting FAQ",
      error: error.message,
    });
  }
};