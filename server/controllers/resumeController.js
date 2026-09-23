const Resume = require("../models/Resume");
const User = require("../models/User");

// ==========================================
// GET MY RESUME
// ==========================================

const getResume = async (req, res) => {
  try {
    // ==========================================
    // FIND LOGGED-IN USER
    // ==========================================

    const user = await User.findById(req.user).select(
      "_id username name email"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ==========================================
    // FIND USER'S RESUME
    // ==========================================

    let resume = await Resume.findOne({
      user: req.user,
    });

    // ==========================================
    // CREATE RESUME IF DOESN'T EXIST
    // ==========================================

    if (!resume) {
      resume = await Resume.create({
        user: req.user,

        personalInfo: {
          fullName: user.name || "",
          email: user.email || "",
          phone: "",
          location: "",
          profession: "",
          profileImage: "",
        },

        summary: "",

        education: [],

        experience: [],

        skills: [],

        // ==========================================
        // STRENGTHS
        // ==========================================

        strengths: [],

        projects: [],

        certifications: [],

        languages: [],

        socialLinks: {
          github: "",
          linkedin: "",
          twitter: "",
          website: "",
        },

        templateId: "professional",
      });
    }

    // ==========================================
    // RETURN RESUME + ACTUAL LOGGED-IN USER
    // ==========================================

    res.status(200).json({
      message: "Resume fetched successfully",

      resume,

      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Get Resume Error:", error);

    res.status(500).json({
      message: "Failed to fetch resume",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE MY RESUME
// ==========================================

const updateResume = async (req, res) => {
  try {
    const {
      personalInfo,
      summary,
      education,
      experience,
      skills,
      strengths,
      projects,
      certifications,
      languages,
      socialLinks,
      templateId,
    } = req.body;

    // ==========================================
    // FIND USER
    // ==========================================

    const user = await User.findById(req.user).select(
      "_id username name email"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ==========================================
    // FIND USER'S RESUME
    // ==========================================

    let resume = await Resume.findOne({
      user: req.user,
    });

    // ==========================================
    // CREATE RESUME IF DOESN'T EXIST
    // ==========================================

    if (!resume) {
      resume = new Resume({
        user: req.user,
      });
    }

    // ==========================================
    // PERSONAL INFORMATION
    // ==========================================

    resume.personalInfo = personalInfo || {
      fullName: user.name || "",
      email: user.email || "",
      phone: "",
      location: "",
      profession: "",
      profileImage: "",
    };

    // ==========================================
    // SUMMARY
    // ==========================================

    resume.summary = summary || "";

    // ==========================================
    // EDUCATION
    // ==========================================

    resume.education = Array.isArray(education)
      ? education
      : [];

    // ==========================================
    // EXPERIENCE
    // ==========================================

    resume.experience = Array.isArray(experience)
      ? experience
      : [];

    // ==========================================
    // SKILLS
    // ==========================================

    resume.skills = Array.isArray(skills)
      ? skills
      : [];

    // ==========================================
    // STRENGTHS
    // ==========================================

    resume.strengths = Array.isArray(strengths)
      ? strengths
      : [];

    // ==========================================
    // PROJECTS
    // ==========================================

    resume.projects = Array.isArray(projects)
      ? projects
      : [];

    // ==========================================
    // CERTIFICATIONS
    // ==========================================

    resume.certifications = Array.isArray(
      certifications
    )
      ? certifications
      : [];

    // ==========================================
    // LANGUAGES
    // ==========================================

    resume.languages = Array.isArray(languages)
      ? languages
      : [];

    // ==========================================
    // SOCIAL LINKS
    // ==========================================

    resume.socialLinks = socialLinks || {
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
    };

    // ==========================================
    // TEMPLATE
    // ==========================================

    resume.templateId =
      templateId || "professional";

    // ==========================================
    // SAVE TO MONGODB
    // ==========================================

    const savedResume = await resume.save();

    console.log("====================================");
    console.log("Resume saved successfully ✅");
    console.log("User:", user.username);
    console.log("User ID:", user._id);
    console.log("Strengths:", savedResume.strengths);
    console.log("====================================");

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      message: "Resume saved successfully",

      resume: savedResume,

      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Update Resume Error:", error);

    res.status(500).json({
      message: "Failed to save resume",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE MY RESUME
// ==========================================

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    await Resume.deleteOne({
      _id: resume._id,
    });

    res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete Resume Error:", error);

    res.status(500).json({
      message: "Failed to delete resume",
      error: error.message,
    });
  }
};

// ==========================================
// GET PUBLIC RESUME
// ==========================================

const getPublicResume = async (req, res) => {
  try {
    const username = req.params.username
      .trim()
      .toLowerCase();

    // ==========================================
    // FIND USER BY USERNAME
    // ==========================================

    const user = await User.findOne({
      username,
    }).select(
      "_id username name email"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ==========================================
    // FIND USER'S RESUME
    // ==========================================

    const resume = await Resume.findOne({
      user: user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    // ==========================================
    // RETURN PUBLIC RESUME
    // ==========================================

    res.status(200).json({
      message: "Public resume fetched successfully",

      resume,

      user: {
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(
      "Public Resume Error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch public resume",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getResume,
  updateResume,
  deleteResume,
  getPublicResume,
};