const express = require('express');
const router = express.Router({ mergeParams: true });
const FlightSession = require('../models/flightSession');

// INDEX
router.get('/', async (req, res) => {
  const sessions = await FlightSession.find({ user: req.params.userId });
  res.render('sessions/index.ejs', { sessions, userId: req.params.userId });
});

// NEW
router.get('/new', (req, res) => {
  res.render('sessions/new.ejs', { userId: req.params.userId });
});

// SHOW
router.get('/:id', async (req, res) => {
  const session = await FlightSession.findById(req.params.id);
    const tagIcons = {
    "Day Flight": "🌞",
    "Night Flight": "🌙",
    "Logged": "📘",
    "Solo": "🧍‍♂️",
    "Crosswind": "💨",
    "Emergency Drill": "🚨",
    "Simulator": "🖥️",
    "Pattern Work": "🔁",
    "Checkride Prep": "✅"
  };
  res.render('sessions/show.ejs', { session, userId: req.params.userId, tagIcons });
});

// EDIT
router.get('/:id/edit', async (req, res) => {
  const session = await FlightSession.findById(req.params.id);
  res.render('sessions/edit.ejs', { session, userId: req.params.userId });
});

// CREATE
router.post('/', async (req, res) => {
  let tags = req.body.tags;
  if (!Array.isArray(tags)) {
    tags = tags ? [tags] : [];
  }

    // Automatically add "Logged" if it's not already present
  if (!tags.includes('Logged')) {
    tags.push('Logged');
  }

  const sessionData = {
    ...req.body,
    user: req.params.userId,
    tags
  };
    
  try {
  const session = await FlightSession.create(sessionData);
  res.redirect(`/users/${req.params.userId}/sessions`);
  } catch (err) {
    console.error(err);
    res.render('sessions/new', { error: 'Failed to create session.' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  let tags = req.body.tags;
  if (!Array.isArray(tags)) {
    tags = tags ? [tags] : [];
  }

  const updatedData = {
    ...req.body,
    tags
  };
  await FlightSession.findByIdAndUpdate(req.params.id, updatedData);
  res.redirect(`/users/${req.params.userId}/sessions`);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await FlightSession.findByIdAndDelete(req.params.id);
  res.redirect(`/users/${req.params.userId}/sessions`);
});

module.exports = router;
