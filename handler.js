'use strict';

const getHustlin = require('./lib/hustlin');
const sendEmail = require('./lib/email');

const emailRecpient = process.env.RECIPIENT;
const emailSubject = 'There is baseball today!';

module.exports.run = (event, context, callback) => {
  getHustlin()
    .then((hustlin) => { // eslint-disable-line arrow-body-style
      return sendEmail(emailRecpient, emailSubject, JSON.stringify(hustlin));
    })
    .then(() => {
      callback(null, { success: true });
    })
    .catch((error) => {
      callback(error, { success: false });
    });
};
