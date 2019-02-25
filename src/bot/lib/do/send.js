const _ = require('lodash');
const Promise = require('bluebird');

module.exports = (bot, channel, message) => Promise.try(() => {
  if (_.isArray(channel)) {
    _.each(channel, ch => ch.send(message));
  } else {
    channel.send(message);
  }
})
  .catch(bot.logging.logError);
