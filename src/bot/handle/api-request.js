const _ = require('lodash');
const https = require('https');

module.exports = (bot, channel, endPoint, args) => {
  bot.getApiReponse(endPoint, args)
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
