const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../models/user');
// const FlightSession = require('../models/flightSession');
// const Milestone = require('../models/milestone');

// Show progress page
// router.get('/', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) return res.status(404).send("User not found");

//     res.render('users/progress', { user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error loading progress page");
//   }
// });
router.get('/', (req, res) => {
  // Temporary mock user for demo
  const user = {
    username: "Orville_Wright",
    totalHours: 8,
    milestonesCompleted: 2
  };

  res.render('progress/index', { user });
});

module.exports = router;
