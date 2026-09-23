const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // PROJECT CATEGORY
    // ==========================================

    category: {
      type: String,
      trim: true,
      default: "Other",
    },

    techStack: {
      type: [String],
      default: [],
    },

    repoLink: {
      type: String,
      default: "",
    },

    liveLink: {
      type: String,
      default: "",
    },

    screenshot: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);