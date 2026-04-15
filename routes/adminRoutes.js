const router = require("express").Router();
const adminCtrl = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post(
  "/create-service",
  auth,
  upload.array("images"),
  adminCtrl.createService
);

module.exports = router;