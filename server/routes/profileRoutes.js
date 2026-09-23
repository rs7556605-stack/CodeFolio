const express = require("express");

const {
  getProfile,
  updateProfile,
  upgradeToPro,
} = require("../controllers/profileController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// GET PROFILE
// ===============================

router.get(
  "/",
  protect,
  getProfile
);


// ===============================
// UPDATE PROFILE
// ===============================

router.put(
  "/",
  protect,
  updateProfile
);


// ===============================
// DEMO UPGRADE TO PRO
// ===============================

router.post(
  "/upgrade-demo",
  protect,
  upgradeToPro
);


module.exports = router;