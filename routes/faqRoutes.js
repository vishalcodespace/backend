const express = require("express");
const router = express.Router();
const {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  patchFAQ,
  deleteFAQ,
} = require("../controllers/faqController");

// Create - POST
router.post("/faqs", createFAQ);

// Read - GET all
router.get("/faqs", getAllFAQs);

// Read - GET single
router.get("/faqs/:id", getFAQById);

// Update - PUT (full update)
router.put("/faqs/:id", updateFAQ);

// Patch - PATCH (partial update)
router.patch("/faqs/:id", patchFAQ);

// Delete - DELETE
router.delete("/faqs/:id", deleteFAQ);

module.exports = router;