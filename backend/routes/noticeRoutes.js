
const express = require("express");
const router = express.Router();

const Notice = require("../models/Notice");

// GET: Fetch all notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notices",
    });
  }
});

// POST: Add a new notice
router.post("/", async (req, res) => {
  try {
    const { title, message, category, postedBy } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required",
      });
    }

    const notice = await Notice.create({
      title,
      message,
      category,
      postedBy,
    });

    res.status(201).json({
      success: true,
      message: "Notice added successfully",
      notice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add notice",
    });
  }
});

module.exports = router;
