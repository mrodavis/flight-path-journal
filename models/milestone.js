const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: String,
  date: Date,
  status: {
    type: String,
    enum: ["Pending", "Complete"],
    default: "Pending"
  },
  flightSession: { type: mongoose.Schema.Types.ObjectId, ref: "FlightSession" }
});

const Milestone = mongoose.model("Milestone", milestoneSchema);
module.exports = Milestone;
