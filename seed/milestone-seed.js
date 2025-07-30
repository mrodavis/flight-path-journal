// seed/milestone-seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Milestone = require("../models/milestone");
const User = require("../models/user");

// Replace this with your actual username or pass it via CLI
const username = process.argv[2]; // e.g. node seed/milestone-seed.js orville_davis

if (!username) {
  console.log("❌ Please provide a username: node seed/milestone-seed.js <username>");
  process.exit();
}

const milestones = [
  { type: "Intro Flight", description: "Your very first flight lesson", status: "Complete" },
  { type: "First Solo", description: "Fly solo for the first time" },
  { type: "Solo Cross-Country", description: "Complete a solo flight >50nm" },
  { type: "Night Flight", description: "Fly at night with instructor" },
  { type: "Pre-Solo Written", description: "Pass FAA pre-solo written test" },
  { type: "Checkride Prep", description: "Final checkride prep with instructor" },
  { type: "Private Pilot License", description: "Pass your FAA PPL checkride" },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne({ username });
    if (!user) throw new Error(`User not found: ${username}`);

    // Add userId to each milestone
    const seededMilestones = milestones.map((m) => ({
      ...m,
      user: user._id,
    }));

    await Milestone.insertMany(seededMilestones);
    console.log(`✅ Seeded milestones for user: ${username}`);
  } catch (err) {
    console.error("❌ Error seeding milestones:", err);
  } finally {
    mongoose.connection.close();
  }
})();
