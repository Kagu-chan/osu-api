const _ = require('lodash');

module.exports = (bot) => {
  const { client } = bot;

  client.on('channelDelete', (channel) => {
    if (channel.type === 'text' && channel.name.match(process.env.BOT_CHANNEL_REGEX)) {
      _.assign(bot, {
        botChannels: _.filter(bot.botChannels, ch => ch.id !== channel.id),
      });
      bot.logging.logInfo(`Unregistering deleted channel ${channel.name} on ${channel.guild.name}`);
    }
  });
};
