const express = require("express");

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getMe,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot password: send reset email
router.post("/forgot-password", forgotPassword);

// Reset password using the emailed token
router.post("/reset-password/:token", resetPassword);

// Current authenticated user
router.get("/me", protect, getMe);

module.exports = router;