// Requires
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather.js');

// Configuration for flags
const argv = yargs
  .options({
    // Address input by user
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

// Retreive address information
geocode.geocodeAddress(argv.address, (geoError, results) => {

  // Error
  if(geoError) {
    console.log(geoError);
  // Success
  } else {
      // Retreive weather information
      weather.getWeather(results.lat, results.lng, (weatherError, weatherResults) => {
      // Error
      if(weatherError) {
          console.log(weatherError);
      // Success: Print weather info
      } else {
        console.log(`Weather results for ${results.address}:`);
        console.log(`It is currently ${weatherResults.temperature} dgerees Farenheit. It feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});
