const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
  // flightSessions and milestones are referenced in their own collections
});

const User = mongoose.model("User", userSchema);
module.exports = User;
