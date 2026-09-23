const express = require("express");

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.delete("/:id", protect, deleteProject);
// Create Project
router.post("/", protect, createProject);

// Get My Projects
router.get("/", protect, getProjects);

// Update Project
router.put("/:id", protect, updateProject);

module.exports = router;