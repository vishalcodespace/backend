const router = require("express").Router();
const userCtrl = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.get("/profile", auth, userCtrl.getProfile);

module.exports = router;