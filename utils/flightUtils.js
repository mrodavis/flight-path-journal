// utils/flightUtils.js

function generateFlightLogId({ date, airportCode, username }) {
  const formattedDate = new Date(date).toISOString().split('T')[0].replace(/-/g, '');
  const userPart = username.replace(/\s+/g, '').toUpperCase();
  const code = airportCode.toUpperCase();

  return `FL-${formattedDate}-${code}-${userPart}`;
}

module.exports = { generateFlightLogId };