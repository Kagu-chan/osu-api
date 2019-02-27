const _ = require('lodash');

module.exports = (bot) => {
  const { client } = bot;

  client.on('channelDelete', (channel) => {
    const { botChannels } = bot;

    if (botChannels[channel.id]) {
      _.assign(bot, {
        botChannels: _.omit(bot.botChannels, channel.id),
      });
      bot.logging.logInfo(`Removing deleted channel ${channel.name} on ${channel.guild.name}`);
    }
  });
};
