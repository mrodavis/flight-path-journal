const express = require("express");
const router = express.Router();
const FlightSession = require("../models/flightSession");
const Milestone = require("../models/milestone");

router.get("/", async (req, res) => {
  try {
    const userId = req.session.user?._id;
    let totalHours = 0;
    let totalMilestones = 0;
    let nextMilestoneThreshold = 50;

    if (userId) {
      const sessions = await FlightSession.find({ user: userId });
      const milestones = await Milestone.find({ user: userId, status: "Complete" });

      totalHours = sessions.reduce((sum, session) => sum + session.duration, 0);
      totalMilestones = milestones.length;
    }

    res.render("index.ejs", {
      user: req.session.user,
      totalHours,
      totalMilestones,
      nextMilestoneThreshold,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).send("Error loading dashboard.");
  }
});

module.exports = router;
