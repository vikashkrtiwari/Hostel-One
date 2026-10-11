const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
console.log("Mongo URI:", process.env.MONGO_URI);

const Complaint = require("./models/Complaint");
const noticeRoutes = require("./routes/noticeRoutes");

const app = express();

// =========================
// Middleware
// =========================

app.use(cors());
app.use(express.json());
app.use("/api/notices", noticeRoutes);

// =========================
// MongoDB Connection
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

// =========================
// Test API
// =========================

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Hostel One Backend is working!",
  });
});

// =========================
// Create Complaint
// =========================

app.post("/api/complaints", async (req, res) => {
  try {
    const { studentId, title, description } = req.body;

    const complaint = new Complaint({
      studentId,
      title,
      description,
    });

    const savedComplaint = await complaint.save();

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint: savedComplaint,
    });
  } catch (error) {
    console.error("Complaint error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit complaint",
    });
  }
});

// =========================
// Get All Complaints
// =========================

app.get("/api/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      complaints: complaints,
    });
  } catch (error) {
    console.error("Get complaints error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get complaints",
    });
  }
});

// =========================
// Start Server
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});