const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

// Apply to a campaign
router.post("/", async (req, res) => {
  try {
    const { campaignId, influencerId } = req.body;

    const application = await Application.create({
      campaignId,
      influencerId,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate({
        path: "campaignId",
        populate: {
          path: "createdBy",
          select: "name email",
        },
      })
      .populate("influencerId", "name email");

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Approve or reject an application
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Approved or Rejected",
      });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json({
      message: `Application ${status.toLowerCase()} successfully`,
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;