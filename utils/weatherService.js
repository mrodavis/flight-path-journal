const axios = require('axios');

async function fetchMetar(station) {
  try {
    if (station.length === 3) {
      station = `K${station}`;
    }

    const response = await axios.get(`https://aviationweather.gov/api/data/metar?ids=${station}&format=json`);

    const data = response.data[0];
    if (!data) return null;

    return {
      stationId: data.icaoId || station,
      time: data.reportTime || 'N/A',
      flightCategory: data.flight_category || 'N/A',
      windDir: data.wdir || 'N/A',
      windSpeed: data.wspd || 'N/A',
      visibility: data.visib || 'N/A',
      temperature: data.temp || 'N/A',
      altimeter: data.altim || 'N/A'
    };
  } catch (error) {
    console.error('METAR fetch error:', error.message);
    return null;
  }
}


module.exports = { fetchMetar };
