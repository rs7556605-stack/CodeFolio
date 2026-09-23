const User = require("../models/User");

// ===============================
// GET MY PROFILE
// ===============================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// UPDATE MY PROFILE
// ===============================
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      profession,
      bio,
      profileImage,
      resumeUrl,
      socialLinks,
      templateId,
    } = req.body;

    // ===============================
    // FIND USER
    // ===============================
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ===============================
    // UPDATE NAME
    // ===============================
    if (name !== undefined) {
      user.name = name;
    }

    // ===============================
    // UPDATE PROFESSION
    // ===============================
    if (profession !== undefined) {
      user.profession = profession;
    }

    // ===============================
    // UPDATE BIO
    // ===============================
    if (bio !== undefined) {
      user.bio = bio;
    }

    // ===============================
    // UPDATE PROFILE IMAGE
    // ===============================
    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }

    // ===============================
    // UPDATE RESUME
    // ===============================
    if (resumeUrl !== undefined) {
      user.resumeUrl = resumeUrl;
    }

    // ===============================
    // UPDATE SOCIAL LINKS
    // ===============================
    if (socialLinks !== undefined) {
      user.socialLinks = {
        ...user.socialLinks,
        ...socialLinks,
      };
    }

    // ===============================
    // UPDATE TEMPLATE
    // ===============================
    if (templateId !== undefined) {
      // --------------------------------
      // ALLOWED TEMPLATES
      // --------------------------------
      const allowedTemplates = [
        "minimalist",
        "cyberpunk",
        "nexus",
        "corporate",
        "glassmorphism",
      ];

      // --------------------------------
      // CHECK VALID TEMPLATE
      // --------------------------------
      if (!allowedTemplates.includes(templateId)) {
        return res.status(400).json({
          message: "Invalid template selected",
        });
      }

      // --------------------------------
      // PRO TEMPLATES
      // --------------------------------
      const premiumTemplates = [
        "cyberpunk",
        "nexus",
        "corporate",
        "glassmorphism",
      ];

      // --------------------------------
      // CHECK PRO ACCESS
      // --------------------------------
      if (
        premiumTemplates.includes(templateId) &&
        user.role !== "pro"
      ) {
        return res.status(403).json({
          message:
            "This premium template is available for Pro users only 👑",
        });
      }

      // --------------------------------
      // SAVE TEMPLATE
      // --------------------------------
      user.templateId = templateId;
    }

    // ===============================
    // SAVE USER
    // ===============================
    const updatedUser = await user.save();

    // ===============================
    // REMOVE PASSWORD
    // ===============================
    const userResponse = updatedUser.toObject();

    delete userResponse.password;

    // ===============================
    // RESPONSE
    // ===============================
    res.status(200).json({
      message: "Profile updated successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// DEMO UPGRADE TO PRO
// ===============================
//
// NOTE:
// This is only for internship/demo
// purposes.
// No real payment is involved.
//
// Later we can replace this with
// Razorpay payment verification.
// ===============================
const upgradeToPro = async (req, res) => {
  try {
    // ===============================
    // FIND USER
    // ===============================
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ===============================
    // CHECK ALREADY PRO
    // ===============================
    if (user.role === "pro") {
      return res.status(400).json({
        message: "You are already a Pro user 👑",
      });
    }

    // ===============================
    // UPGRADE USER
    // ===============================
    user.role = "pro";

    await user.save();

    // ===============================
    // REMOVE PASSWORD
    // ===============================
    const userResponse = user.toObject();

    delete userResponse.password;

    // ===============================
    // RESPONSE
    // ===============================
    res.status(200).json({
      message: "Demo Pro activated successfully 👑",
      user: userResponse,
    });
  } catch (error) {
    console.error("Demo Upgrade Error:", error.message);

    res.status(500).json({
      message: "Failed to activate Pro",
    });
  }
};

// ===============================
// EXPORT
// ===============================
module.exports = {
  getProfile,
  updateProfile,
  upgradeToPro,
};