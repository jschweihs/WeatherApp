const request = require('request');

var geocodeAddress = (address, callback) => {
  // Format address for URL
  var encodedAddress = encodeURIComponent(address);

  // Request data from Google API
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    // Connection error
    if(error) {
      callback('Unable to connect to Google servers.');
    // Invalid address submitted
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to locate address.');
    // Successful query
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
