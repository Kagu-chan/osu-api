const _ = require('lodash');
const https = require('https');

module.exports = (bot, endpoint, data, ...args) => {
  const url = `${process.env.API_URL}/${endpoint}?k=${process.env.API_KEY}`;
  const urlBuilder = [
    url
  ];

  bot.parseArguments(data, ...args);

  _.forEach(data, (value, key) => {
    if (value !== undefined) {
      urlBuilder.push(`${key}=${value}`);
    }
  });

  const finalUrl = urlBuilder.join('&');
  const prom = new Promise((resolve, reject) => {
    https.get(finalUrl, (resp) => {
      let responseData = '';

      resp.on('data', (chunk) => {
        responseData += chunk;
      })
      resp.on('end', () => {
        resolve(responseData);
      });
    }).on('error', reject);
  });

  return prom;
};
