const _ = require('lodash');

module.exports = (bot) => {
  _.assign(bot, {
    botChannels: bot.getBotChannels(),
  });

  _.each(bot.botChannels, (channel) => {
    bot.logging.logInfo(`Attached to ${channel.name} on ${channel.guild.name}`);
  });
};
