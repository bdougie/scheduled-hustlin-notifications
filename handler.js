'use strict';

const axios = require('axios');
const sendEmail = require('./lib/email');

const emailRecpient = process.env.RECIPIENT;
const emailSubject = 'There is baseball today!';
const hustlinEndpoint = 'https://jzulvmdhac.execute-api.us-west-1.amazonaws.com/dev/today'

module.exports.run = (event, context, callback) => {
  axios.get(hustlinEndpoint)
    .then((hustlin) => { // eslint-disable-line arrow-body-style
      if (hustlin.data.games.length > 1) {
        return sendEmail(emailRecpient, emailSubject, "http://hustlin.netlify.com/");
      }
      return () => {};
    })
    .then(() => {
      callback(null, { success: true });
    })
    .catch((error) => {
      console.log(error)
      callback(error, { success: false });
    });
};
