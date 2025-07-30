const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Pending', 'Complete'],
    default: 'Pending'
  },
  flightSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FlightSession',
    required: false // Optional 1-to-1: this milestone may be tied to one flight session
  }
}, {
  timestamps: true
});

const Milestone = mongoose.model('Milestone', milestoneSchema);

module.exports = Milestone;
