const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Professor = require("../models/Professor");
const auth = require("../middleware/auth");

// GET /api/users/starred — get all starred professors
router.get("/starred", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedProfessors");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user.savedProfessors);
  } catch (err) {
    console.error("GET STARRED ERROR:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// POST /api/users/starred/:professorId — star a professor
router.post("/starred/:professorId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const alreadyStarred = user.savedProfessors.includes(req.params.professorId);
    if (alreadyStarred) {
      return res.status(400).json({ msg: "Professor already starred" });
    }

    user.savedProfessors.push(req.params.professorId);
    await user.save();

    res.json({ msg: "Professor starred" });
  } catch (err) {
    console.error("STAR ERROR:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /api/users/starred/:professorId — unstar a professor
router.delete("/starred/:professorId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.savedProfessors = user.savedProfessors.filter(
      id => id.toString() !== req.params.professorId
    );
    await user.save();

    res.json({ msg: "Professor unstarred" });
  } catch (err) {
    console.error("UNSTAR ERROR:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;