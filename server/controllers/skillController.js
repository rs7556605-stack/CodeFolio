const Skill = require("../models/Skill");

// ===============================
// CREATE SKILL
// ===============================
const createSkill = async (req, res) => {
  try {
    const { name, category, level } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        message: "Skill name and category are required",
      });
    }

    const skill = await Skill.create({
      user: req.user,
      name,
      category,
      level: level || "Beginner",
    });

    res.status(201).json({
      message: "Skill created successfully",
      skill,
    });
  } catch (error) {
    console.error("Create Skill Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// GET MY SKILLS
// ===============================
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({
      user: req.user,
    }).sort({ category: 1, createdAt: -1 });

    res.status(200).json({
      message: "Skills fetched successfully",
      skills,
    });
  } catch (error) {
    console.error("Get Skills Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// UPDATE SKILL
// ===============================
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, level } = req.body;

    const skill = await Skill.findOne({
      _id: id,
      user: req.user,
    });

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    if (name !== undefined) {
      skill.name = name;
    }

    if (category !== undefined) {
      skill.category = category;
    }

    if (level !== undefined) {
      skill.level = level;
    }

    const updatedSkill = await skill.save();

    res.status(200).json({
      message: "Skill updated successfully",
      skill: updatedSkill,
    });
  } catch (error) {
    console.error("Update Skill Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// DELETE SKILL
// ===============================
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findOne({
      _id: id,
      user: req.user,
    });

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    await Skill.deleteOne({
      _id: id,
    });

    res.status(200).json({
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error("Delete Skill Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
};