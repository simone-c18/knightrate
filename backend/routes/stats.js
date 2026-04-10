const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// GET /api/stats/global
// Returns UCF-wide averages from rawGlobalStatistics collection
router.get("/global", async (req, res) => {
  try {
    const doc = await mongoose.connection.db
      .collection("rawGlobalStatistics")
      .findOne({});

    if (!doc) {
      return res.status(404).json({ msg: "Global stats not found" });
    }

    res.json({
      retakeAvg:     doc.avg_would_take_again,
      qualityAvg:    doc.avg_quality,
      difficultyAvg: doc.avg_difficulty,
      overallAvg:    doc.avg_overall,
    });
  } catch (err) {
    console.error("STATS ERROR:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
