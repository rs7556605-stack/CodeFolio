const Project = require("../models/Project");

// ===============================
// CREATE PROJECT
// ===============================
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      techStack,
      repoLink,
      liveLink,
      screenshot,
    } = req.body;

    // Required fields
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    // Create project
    const project = await Project.create({
      user: req.user,

      title,

      description,

      category:
        category?.trim() || "Other",

      techStack: techStack || [],

      repoLink:
        repoLink || "",

      liveLink:
        liveLink || "",

      screenshot:
        screenshot || "",
    });

    res.status(201).json({
      message: "Project created successfully",

      project,
    });
  } catch (error) {
    console.error(
      "Create Project Error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// GET MY PROJECTS
// ===============================
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message:
        "Projects fetched successfully",

      projects,
    });
  } catch (error) {
    console.error(
      "Get Projects Error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// UPDATE PROJECT
// ===============================
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      category,
      techStack,
      repoLink,
      liveLink,
      screenshot,
    } = req.body;

    // Find project belonging to
    // logged-in user
    const project =
      await Project.findOne({
        _id: id,
        user: req.user,
      });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // ========================================
    // UPDATE FIELDS
    // ========================================

    if (title !== undefined) {
      project.title = title;
    }

    if (description !== undefined) {
      project.description =
        description;
    }

    if (category !== undefined) {
      project.category =
        category.trim() || "Other";
    }

    if (techStack !== undefined) {
      project.techStack = techStack;
    }

    if (repoLink !== undefined) {
      project.repoLink = repoLink;
    }

    if (liveLink !== undefined) {
      project.liveLink = liveLink;
    }

    if (screenshot !== undefined) {
      project.screenshot =
        screenshot;
    }

    const updatedProject =
      await project.save();

    res.status(200).json({
      message:
        "Project updated successfully",

      project: updatedProject,
    });
  } catch (error) {
    console.error(
      "Update Project Error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// DELETE PROJECT
// ===============================
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Find project belonging to
    // logged-in user
    const project =
      await Project.findOne({
        _id: id,
        user: req.user,
      });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await Project.deleteOne({
      _id: id,
    });

    res.status(200).json({
      message:
        "Project deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Project Error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};