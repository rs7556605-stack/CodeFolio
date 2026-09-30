
const User = require("../models/User");

const requirePro = async (req, res, next) => {
  try {
    // Your auth middleware stores the user ID directly in req.user.
    const userId = req.user;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const user = await User.findById(userId).select("role");

    if (!user) {
      return res.status(401).json({
        message: "User not found.",
      });
    }

    if (user.role !== "pro") {
      return res.status(403).json({
        message: "Custom Domains is available to Pro users only.",
      });
    }

    req.proUser = user;
    next();
  } catch (error) {
    console.error("Pro authorization error:", error.message);

    return res.status(500).json({
      message: "Unable to verify Pro access.",
    });
  }
};

module.exports = requirePro;