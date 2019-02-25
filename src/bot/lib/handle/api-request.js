const Promise = require('bluebird');
const _ = require('lodash');

module.exports = (bot, channel, endPoint, data, ...args) => {
  bot.getApiResponse(endPoint, data, ...args)
    .then((response) => {
      const msg = JSON.stringify(JSON.parse(response), undefined, 2);
      const chunks = msg.match(/.{1,1500}/gm);

      let p = Promise.try();

      _.each(chunks, (chunk) => {
        p = p.then(() => channel.send(['```json', chunk, '```']));
      });

      return p;
    })
    .catch(bot.logging.logError);

  return false;
};
