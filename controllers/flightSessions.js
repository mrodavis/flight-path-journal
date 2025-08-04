const express = require('express');
const router = express.Router({ mergeParams: true });
const FlightSession = require('../models/flightSession');
const pdf = require('html-pdf');
const ejs = require('ejs');
const path = require('path');
const { generateFlightLogId } = require('../utils/flightUtils');
const User = require('../models/user'); // 
const { fetchMetar } = require('../utils/weatherService'); // add this at the top





// INDEX
router.get('/', async (req, res) => {
  const sessions = await FlightSession.find({ user: req.params.userId });
   // Define a default airport
  const defaultAirport = sessions[0]?.location || 'JFK';

  // Fetch METAR
  const metar = await fetchMetar(defaultAirport, new Date());
  res.render('sessions/index.ejs', { sessions, userId: req.params.userId, metar });
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
// DOWNLOAD PDF
router.get('/:id/download', async (req, res) => {
  const session = await FlightSession.findById(req.params.id);
  const filePath = path.join(__dirname, '../views/sessions/pdf-template.ejs');

  ejs.renderFile(filePath, { session }, (err, html) => {
    if (err) {
      console.error(err);
      return res.status(500).send('PDF generation failed');
    }

    pdf.create(html).toStream((err, stream) => {
      if (err) return res.status(500).send('Error streaming PDF');
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=flight-log-${session.date.toISOString().split('T')[0]}.pdf`);
      stream.pipe(res);
    });
  });
});

// CREATE
router.post('/', async (req, res) => {
  console.log('POST /sessions fired');
  console.log('req.params.userId:', req.params.userId);
  console.log('req.body:', req.body);
  let tags = req.body.tags;
  if (!Array.isArray(tags)) {
    tags = tags ? [tags] : [];
  }

    // Automatically add "Logged" if it's not already present
  if (!tags.includes('Logged')) {
    tags.push('Logged');
  }

  const user = await User.findById(req.params.userId);
  if (!user) throw new Error('User not found');

  // Generate the custom log ID
  const logId = generateFlightLogId({
    date: req.body.date,
    airportCode: req.body.location,
    username: user.username // ⬅️ make sure you have req.user populated
  });

  const sessionData = {
    ...req.body,
    user: req.params.userId,
    tags,
    logId
  };
    
  try {
  const session = await FlightSession.create(sessionData);
  res.redirect(`/users/${req.params.userId}/sessions`);
  } catch (err) {
    console.error(err);
    res.render('sessions/new.ejs', { error: 'Failed to create session.' });
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
