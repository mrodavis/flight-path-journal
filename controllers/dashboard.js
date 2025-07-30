const FlightSession = require('../models/flightSession');
const Milestone = require('../models/milestone');

module.exports = {
  async index(req, res) {
    try {
      const userId = req.session.user._id;

      const sessions = await FlightSession.find({ user: userId });
      const milestones = await Milestone.find({ user: userId, status: 'Complete' });

      const totalHours = sessions.reduce((sum, session) => sum + session.duration, 0);
      const totalMilestones = milestones.length;

      // Optional: Set a dynamic goal (e.g., every 10 hours is a new milestone target)
      const nextMilestoneThreshold = Math.ceil((totalHours + 1) / 10) * 10;

      res.render('index', {
        user: req.session.user,
        totalHours,
        totalMilestones,
        nextMilestoneThreshold
      });
    } catch (err) {
      console.error('Dashboard Load Error:', err);
      res.status(500).send('Error loading dashboard.');
    }
  }
};
