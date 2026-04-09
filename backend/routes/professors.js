const express = require("express");
const router = express.Router();
const Professor = require("../models/Professor");

router.get("/search", async (req, res) => {
  try {
    const { filter, q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({ msg: "Query is required" });
    }

    if (filter === "course") {
      const professors = await Professor.find({
        courses: { $regex: q.trim(), $options: "i" }
      }).sort({ overallScore: -1 });

      return res.json(professors);
    }

    // Default: search by professor name
    const parts = q.trim().split(" ");
    let professors;

    if (parts.length === 1) {
      professors = await Professor.find({
        $or: [
          { firstName: { $regex: parts[0], $options: "i" } },
          { lastName:  { $regex: parts[0], $options: "i" } },
        ]
      }).sort({ overallScore: -1 });
    } else {
      professors = await Professor.find({
        firstName: { $regex: parts[0], $options: "i" },
        lastName:  { $regex: parts[parts.length - 1], $options: "i" },
      }).sort({ overallScore: -1 });
    }

    res.json(professors);

  } catch (err) {
    console.error("SEARCH ERROR:", err.message);
    console.error("FULL ERROR:", JSON.stringify(err));
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;