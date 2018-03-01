// Requires
const request = require('request');

// Retreive weather information given latitude and longitude
// then pass back info via callback.
var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/4422aa01c4f7df7a205c3586ecc50e55/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    // Server could not connect
    if(error) {
      callback('Server could not connect.');
    // Invalid information given
    } else if (response.statusCode === 404 || response.statusCode === 400) {
      callback('Unable to fetch weather.');
    // Success
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    // Some other statusCode is returned
    } else {
      callback(`Unknown status code: ${response.statusCode}`);
    }
  });
};

module.exports.getWeather = getWeather;
