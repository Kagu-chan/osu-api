const _ = require('lodash');
const Promise = require('bluebird');

module.exports = (bot, channel, message) => Promise.try(() => {
  const channels = _.isArray(channel) ? channel : [channel];
  const messages = _.isArray(message) ? message : [message];

  const promises = _.flatten(
    _.map(
      channels,
      ch => _.map(
        messages,
        msg => ch.send.bind(ch, msg)
      )
    )
  );

  return Promise.each(promises, prom => prom.call().then(() => new Promise((resolve) => {
    // wait 250 MS after each message
    setTimeout(resolve, 250);
  })), { concurrency: 1 });
})
  .catch(err => bot.logging.logError(err));
