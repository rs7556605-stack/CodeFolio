
const mongoose = require("mongoose");

const customDomainSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    verificationToken: {
      type: String,
      required: true,
      select: false,
    },

    status: {
      type: String,
      enum: ["pending", "verified"],
      default: "pending",
    },

    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CustomDomain",
  customDomainSchema
);