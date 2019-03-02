const _ = require('lodash');

module.exports = (bot) => {
  const { client } = bot;

  client.on('channelUpdate', (oldChannel, newChannel) => {
    const { botChannels } = bot;
    const listeningChannel = botChannels[newChannel.id];
    const match = newChannel.name.match(process.env.BOT_CHANNEL_REGEX);
    const isInterestingChannel = match && newChannel.type === 'text';

    if (listeningChannel && isInterestingChannel) {
      _.assign(botChannels, {
        [newChannel.id]: newChannel,
      });

      bot.logging.logInfo(`Replacing updated channel ${newChannel.name} on ${newChannel.guild.name} (was ${oldChannel.name})`);
    } else if (listeningChannel) {
      _.assign(bot, {
        botChannels: _.omit(bot.botChannels, oldChannel.id),
      });
      bot.logging.logInfo(`Removing updated channel ${newChannel.name} on ${newChannel.guild.name} (was ${oldChannel.name})`);
    } else {
      _.assign(botChannels, {
        [newChannel.id]: newChannel,
      });

      bot.logging.logInfo(`Adding updated channel ${newChannel.name} on ${newChannel.guild.name} (was ${oldChannel.name})`);
    }
  });
};
