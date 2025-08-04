const express = require('express');
const router = express.Router();
const { fetchMetar } = require('../utils/weatherService');

router.get('/:airportCode', async (req, res) => {
  try {
    const code = req.params.airportCode.toUpperCase();
    const metar = await fetchMetar(code, new Date());

    if (metar) {
      res.json(metar);
    } else {
      res.status(404).json({ error: 'No METAR data found.' });
    }
  } catch (error) {
    console.error('Error fetching METAR:', error.message);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
