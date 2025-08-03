// utils/flightUtils.js

function generateFlightLogId({ date, airportCode, username }) {
  const formattedDate = new Date(date).toISOString().split('T')[0].replace(/-/g, '');
  const userPart = username.replace(/\s+/g, '').toUpperCase().slice(0,3);
  const code = airportCode.toUpperCase();

  const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  return `FL-${formattedDate}-${code}-${userPart}-${randomSuffix}`;
}

module.exports = { generateFlightLogId };