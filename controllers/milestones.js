const express = require('express');
const router = express.Router({ mergeParams: true });
const Milestone = require('../models/milestone');

// INDEX
router.get('/', async (req, res) => {
  const milestones = await Milestone.find({ user: req.params.userId });
  res.render('milestones/index.ejs', { milestones, userId: req.params.userId });
});

// NEW
router.get('/new', (req, res) => {
  res.render('milestones/new.ejs', { userId: req.params.userId });
});

// SHOW
router.get('/:id', async (req, res) => {
  const milestone = await Milestone.findById(req.params.id);
  res.render('milestones/show.ejs', { milestone, userId: req.params.userId });
});

// EDIT
router.get('/:id/edit', async (req, res) => {
  const milestone = await Milestone.findById(req.params.id);
  res.render('milestones/edit.ejs', { milestone, userId: req.params.userId });
});

// CREATE
router.post('/', async (req, res) => {
  await Milestone.create({ ...req.body, user: req.params.userId });
  res.redirect(`/users/${req.params.userId}/milestones`);
});

// UPDATE
router.put('/:id', async (req, res) => {
  await Milestone.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/users/${req.params.userId}/milestones`);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Milestone.findByIdAndDelete(req.params.id);
  res.redirect(`/users/${req.params.userId}/milestones`);
});

module.exports = router;
