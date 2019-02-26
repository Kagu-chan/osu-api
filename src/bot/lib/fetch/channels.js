const _ = require('lodash');

module.exports = (bot) => {
  _.assign(bot, {
    botChannels: bot.getBotChannels(),
  });

  bot.botChannels.forEach((channel) => {
    bot.logging.logInfo(`Attached to ${channel.name} on ${channel.guild.name}`);
  });
};
