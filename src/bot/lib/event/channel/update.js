const _ = require('lodash');

module.exports = (bot) => {
  const { client } = bot;

  client.on('channelUpdate', (oldChannel, newChannel) => {
    const listeningChannel = _.find(bot.botChannels, channel => newChannel.id === channel.id);
    const match = newChannel.name.match(process.env.BOT_CHANNEL_REGEX);

    if (listeningChannel) {
      if (newChannel.type === 'text' && match) {
        // We're already listeing to this channel => REPLACE
        _.assign(bot, {
          botChannels: _.filter(bot.botChannels, ch => ch.id !== oldChannel.id),
        });
        bot.botChannels.push(newChannel);
        bot.logging.logInfo(`Replacing updated channel ${newChannel.name} on ${newChannel.guild.name} (was ${oldChannel.name})`);
      } else {
        // We're listeing to this channel and if is not longer our businness
        _.assign(bot, {
          botChannels: _.filter(bot.botChannels, ch => ch.id !== oldChannel.id),
        });
        bot.logging.logInfo(`Removing updated channel ${newChannel.name} on ${newChannel.guild.name} (was ${oldChannel.name})`);
      }
    } else if (newChannel.type === 'text' && match) {
      // We're not listeing to this channel => ADD
      bot.botChannels.push(newChannel);
      bot.logging.logInfo(`Adding updated channel ${newChannel.name} on ${newChannel.guild.name} (was ${oldChannel.name})`);
    }
  });
};
