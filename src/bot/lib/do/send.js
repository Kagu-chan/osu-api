const _ = require('lodash');

module.exports = (bot, channel, message) => {
  if (_.isArray(channel)) {
    _.each(channel, ch => ch.send(message));
  } else {
    channel.send(message);
  }
};
