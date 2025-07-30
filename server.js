const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();

// Middleware
const passUserToView = require("./middleware/pass-user-to-view");
const isSignedIn = require("./middleware/is-signed-in");

const FlightSession = require("./models/flightSession");
const Milestone = require("./models/milestone");

// Controllers
const authController = require("./controllers/auth.js");
const sessionController = require("./controllers/flightSessions");
const milestoneController = require("./controllers/milestones");



// DB Connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Express Config
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Static Files + Auth Context
app.use(express.static("public"));
app.use(passUserToView);

// Routes
app.use("/auth", authController);
app.use(isSignedIn); // protect everything below
app.use("/users/:userId/sessions", sessionController);
app.use("/users/:userId/milestones", milestoneController);
const dashboardRoutes = require('./routes/index');
app.use('/', dashboardRoutes);


// Home
app.get("/", async (req, res) => {
  const userId = req.session.user?._id;

  let totalHours = 0;
  let totalMilestones = 0;
  const nextMilestoneThreshold = 50; // or dynamically based on a roadmap

  if (userId) {
    const sessions = await FlightSession.find({ user: userId });
    const milestones = await Milestone.find({ user: userId, status: "Complete" });

    totalHours = sessions.reduce((sum, session) => sum + session.duration, 0);
    totalMilestones = milestones.length;
  }

  res.render("index.ejs", {
    user: req.session.user,
    totalHours,
    totalMilestones,
    nextMilestoneThreshold: 50 
  });
});


// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
