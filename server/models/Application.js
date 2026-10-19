const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },

    influencerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);