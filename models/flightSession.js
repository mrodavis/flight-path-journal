const mongoose = require('mongoose');

const flightSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in hours
    required: true,
    min: 0.1
  },
  focusArea: {
    type: String,
    required: true,
    trim: true
  },
  notes: {
    type: String
  },
  milestone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Milestone',
    required: false // optional one-to-one reference
  }
}, {
  timestamps: true
});

const FlightSession = mongoose.model('FlightSession', flightSessionSchema);

module.exports = FlightSession;
