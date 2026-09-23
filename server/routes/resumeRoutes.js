const express = require("express");

const {
  getResume,
  updateResume,
  deleteResume,
  getPublicResume,
} = require("../controllers/resumeController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// PRIVATE RESUME
// ==========================================

router.get(
  "/",
  authMiddleware,
  getResume
);

router.put(
  "/",
  authMiddleware,
  updateResume
);

router.delete(
  "/",
  authMiddleware,
  deleteResume
);


// ==========================================
// PUBLIC RESUME
// IMPORTANT: Keep this BEFORE /:id routes
// ==========================================

router.get(
  "/public/:username",
  getPublicResume
);


module.exports = router;