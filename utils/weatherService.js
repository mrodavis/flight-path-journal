// utils/weatherService.js
const axios = require('axios');

async function fetchMetar(airportCode) {
  try {
    const response = await axios.get('https://aviationweather.gov/api/data/metar', {
      params: {
        ids: airportCode.toUpperCase(),
        format: 'json'
      }
    });

    // This API returns an array of METAR objects
    if (response.data && response.data.length > 0) {
      const metar = response.data[0];
      return {
        rawText: metar.rawText,
        stationId: metar.stationId,
        observationTime: metar.observationTime,
        tempC: metar.tempC,
        windDirDegrees: metar.windDirDegrees,
        windSpeedKt: metar.windSpeedKt,
        visibilityStatuteMi: metar.visibilityStatuteMi,
        altimInHg: metar.altimInHg,
        flightCategory: metar.flightCategory
      };
    } else {
      return null;
    }
  } catch (err) {
    console.error("METAR Fetch Error:", err.message);
    return null;
  }
}

module.exports = { fetchMetar };
