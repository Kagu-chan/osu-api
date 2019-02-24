const _ = require('lodash');
const https = require('https');

module.exports = (bot, channel, endPoint, data, ...args) => {
  bot.getApiReponse(endPoint, data, ...args)
    .then((response) => {
      channel.send([
        '```json',
        JSON.stringify(JSON.parse(response), undefined, 2),
        '```'
      ]);
    })
    .catch(console.log);

  return false;
};
