const mongoose = require("mongoose");

// Import embedded schemas or define them here as needed
const flightSessionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  focusArea: { type: String, required: true },
  notes: String,
});

const milestoneSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: String,
  date: Date,
  status: {
    type: String,
    enum: ["Pending", "Complete"],
    default: "Pending"
  },
  flightSession: { type: mongoose.Schema.Types.ObjectId, ref: "FlightSession" } // Optional
});

// Main user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sessions: [flightSessionSchema],
  milestones: [milestoneSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;

