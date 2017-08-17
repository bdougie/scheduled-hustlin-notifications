'use strict';

const axios = require('axios');

module.exports = (latitude, longitude) => {
  const options = {
    exclude: 'minutely,hourly,daily,flags,alerts',
  };

  return new Promise((resolve, reject) => {
    axios.get((error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};
