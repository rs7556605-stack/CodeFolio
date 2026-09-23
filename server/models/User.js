const mongoose= require("mongoose");
const { type } = require("node:os");
const userSchema=new mongoose.Schema(
    {
        username:{
        type: String,
        
         required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      trim: true,
      default: "",
    },
profession: {
  type: String,
  trim: true,
  default: "",
},
    bio: {
      type: String,
      trim: true,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    resumeUrl: {
      type: String,
      default: "",
    },

    socialLinks: {
      github: {
        type: String,
        default: "",
      },

      linkedin: {
        type: String,
        default: "",
      },

      twitter: {
        type: String,
        default: "",
      },

      website: {
        type: String,
        default: "",
      },
    },

    templateId: {
      type: String,
      default: "minimalist",
    },

    role: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);