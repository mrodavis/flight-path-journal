const mongoose = require("mongoose");

const flightSessionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  focusArea: { type: String, required: true },
  notes: String
});

const FlightSession = mongoose.model("FlightSession", flightSessionSchema);
module.exports = FlightSession;
