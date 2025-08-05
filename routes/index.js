const express = require("express");
const router = express.Router();
const FlightSession = require("../models/flightSession");
const Milestone = require("../models/milestone");
const { fetchMetar } = require('../utils/weatherService');
const progressRouter = require('./progress');


router.get("/", async (req, res) => {
  try {
    const userId = req.session.user?._id;
    let totalHours = 0;
    let totalMilestones = 0;
    let nextMilestoneThreshold = 50;
    let metar = null;

    const station = (req.query.station || 'JFK').toUpperCase(); // Get station from query

    if (userId) {
      const sessions = await FlightSession.find({ user: userId });
      const milestones = await Milestone.find({ user: userId, status: "Complete" });

      totalHours = sessions.reduce((sum, session) => sum + session.duration, 0);
      totalMilestones = milestones.length;
    }

    try {
      metar = await fetchMetar(station, new Date());
    } catch (error) {
      console.error('METAR fetch failed:', error.message);
    }

    res.render("index.ejs", {
      user: req.session.user,
      totalHours,
      totalMilestones,
      nextMilestoneThreshold,
      metar
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).send("Error loading dashboard.");
  }
});

router.use('/users/:userId/progress', progressRouter);


module.exports = router;
