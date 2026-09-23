const User = require("../models/User");
const Project = require("../models/Project");
const Skill = require("../models/Skill");

// =================================
// GET PUBLIC PORTFOLIO
// =================================
const getPublicPortfolio = async (req, res) => {
  try {
    const { username } = req.params;

    // Find user by username
    const user = await User.findOne({
      username: username.toLowerCase(),
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }

    // Get user's projects
    const projects = await Project.find({
      user: user._id,
    }).sort({ createdAt: -1 });

    // Get user's skills
    const skills = await Skill.find({
      user: user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Public portfolio fetched successfully",
      user,
      projects,
      skills,
    });

  } catch (error) {
    console.error(
      "Public Portfolio Error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getPublicPortfolio,
};