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
  res.render('sessions/show.ejs', { session, userId: req.params.userId });
});

// EDIT
router.get('/:id/edit', async (req, res) => {
  const session = await FlightSession.findById(req.params.id);
  res.render('sessions/edit.ejs', { session, userId: req.params.userId });
});

// CREATE
router.post('/', async (req, res) => {
  await FlightSession.create({ ...req.body, user: req.params.userId });
  res.redirect(`/users/${req.params.userId}/sessions`);
});

// UPDATE
router.put('/:id', async (req, res) => {
  await FlightSession.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/users/${req.params.userId}/sessions`);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await FlightSession.findByIdAndDelete(req.params.id);
  res.redirect(`/users/${req.params.userId}/sessions`);
});

module.exports = router;
