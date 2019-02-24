const _ = require('lodash');
const https = require('https');

module.exports = (bot, endpoint, args) => {
  const url = `${process.env.API_URL}/${endpoint}?k=${process.env.API_KEY}`;
  const urlBuilder = [
    url
  ];

  _.forEach(args, (value, key) => {
    if (value !== undefined) {
      urlBuilder.push(`${key}=${value}`);
    }
  });

  const finalUrl = urlBuilder.join('&');
  const prom = new Promise((resolve, reject) => {
    https.get(finalUrl, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      })
      resp.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });

  return prom;
};
