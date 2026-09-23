const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER
    // ==========================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // ==========================================
    // PERSONAL INFORMATION
    // ==========================================

    personalInfo: {
      fullName: {
        type: String,
        default: "",
        trim: true,
      },

      email: {
        type: String,
        default: "",
        trim: true,
      },

      phone: {
        type: String,
        default: "",
        trim: true,
      },

      location: {
        type: String,
        default: "",
        trim: true,
      },

      profession: {
        type: String,
        default: "",
        trim: true,
      },

      profileImage: {
        type: String,
        default: "",
      },
    },

    // ==========================================
    // PROFESSIONAL SUMMARY
    // ==========================================

    summary: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================================
    // EDUCATION
    // ==========================================

    education: [
      {
        degree: {
          type: String,
          default: "",
          trim: true,
        },

        institution: {
          type: String,
          default: "",
          trim: true,
        },

        year: {
          type: String,
          default: "",
          trim: true,
        },

        description: {
          type: String,
          default: "",
          trim: true,
        },
      },
    ],

    // ==========================================
    // EXPERIENCE
    // ==========================================

    experience: [
      {
        jobTitle: {
          type: String,
          default: "",
          trim: true,
        },

        company: {
          type: String,
          default: "",
          trim: true,
        },

        startDate: {
          type: String,
          default: "",
          trim: true,
        },

        endDate: {
          type: String,
          default: "",
          trim: true,
        },

        description: {
          type: String,
          default: "",
          trim: true,
        },

        // Multiple responsibilities
        responsibilities: {
          type: [String],
          default: [],
        },
      },
    ],

    // ==========================================
    // SKILLS
    // ==========================================

   // ==========================================
// SKILLS
// ==========================================

skills: [
  {
    type: {
      type: String,
      enum: ["Technical", "Soft"],
      default: "Technical",
    },

    // Multiple skills
    // Example: ["HTML", "CSS", "JavaScript"]
    name: {
      type: [String],
      default: [],
    },

    // Custom skill
    customName: {
      type: String,
      default: "",
      trim: true,
    },

    // Domain
    category: {
      type: String,
      default: "Other",
      trim: true,
    },

    // Custom domain
    customCategory: {
      type: String,
      default: "",
      trim: true,
    },

    // Technical / Expertise
    expertise: {
      type: String,
      default: "",
      trim: true,
    },

    // Custom expertise
    customExpertise: {
      type: String,
      default: "",
      trim: true,
    },

    // Skill level
    level: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced",
      ],
      default: "Beginner",
    },
  },
],

    // ==========================================
    // STRENGTHS
    // ==========================================

    strengths: {
      type: [String],
      default: [],
    },

    // ==========================================
    // PROJECTS
    // ==========================================

    projects: [
      {
        title: {
          type: String,
          default: "",
          trim: true,
        },

        description: {
          type: String,
          default: "",
          trim: true,
        },

        // Example:
        // ["React", "Node.js", "MongoDB"]
        techStack: {
          type: [String],
          default: [],
        },

        repoLink: {
          type: String,
          default: "",
          trim: true,
        },

        liveLink: {
          type: String,
          default: "",
          trim: true,
        },
      },
    ],

 

// ==========================================
// CERTIFICATIONS
// ==========================================

certifications: [
  {
    name: {
      type: String,
      default: "",
      trim: true,
    },

    organization: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: String,
      default: "",
      trim: true,
    },

    credentialUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
],

    // ==========================================
    // LANGUAGES
    // ==========================================

    languages: [
      {
        name: {
          type: String,
          default: "",
          trim: true,
        },

        level: {
          type: String,
          default: "",
          trim: true,
        },
      },
    ],

    // ==========================================
    // SOCIAL LINKS
    // ==========================================

    socialLinks: {
      github: {
        type: String,
        default: "",
        trim: true,
      },

      linkedin: {
        type: String,
        default: "",
        trim: true,
      },

      twitter: {
        type: String,
        default: "",
        trim: true,
      },

      website: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // ==========================================
    // RESUME TEMPLATE
    // ==========================================

    templateId: {
      type: String,
      default: "professional",
      trim: true,
    },
  },

  // ==========================================
  // TIMESTAMPS
  // ==========================================

  {
    timestamps: true,
  }
);

// ==========================================
// EXPORT MODEL
// ==========================================

module.exports = mongoose.model(
  "Resume",
  resumeSchema
);