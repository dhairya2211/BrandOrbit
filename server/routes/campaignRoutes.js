const express = require("express");
const Campaign = require("../models/Campaign");

const router = express.Router();

// @route   POST /api/campaigns
router.post("/", async (req, res) => {
  try {
    const { title, description, budget, createdBy } = req.body;

    const campaign = await Campaign.create({
      title,
      description,
      budget,
      createdBy,
    });

    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// @route   GET /api/campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate(
      "createdBy",
      "name email"
    );

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


module.exports = router;