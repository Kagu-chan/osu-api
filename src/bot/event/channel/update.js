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
          botChannels: _.filter(bot.botChannels, ch => ch.id !== oldChannel.id)
        });
        bot.botChannels.push(newChannel);
        console.log(`Replacing updated channel ${newChannel.name} on ${newChannel.guild.name} (was ${oldChannel.name})`);
      } else {
        // We're listeing to this channel and if is not longer our businness
        _.assign(bot, {
          botChannels: _.filter(bot.botChannels, ch => ch.id !== oldChannel.id)
        });
        console.log(`Removing updated channel ${newChannel.name} on ${newChannel.guild.name} (was ${oldChannel.name})`);
      }
    } else {
      if (newChannel.type === 'text' && match) {
        // We're not listeing to this channel => ADD
        bot.botChannels.push(newChannel);
        console.log(`Adding updated channel ${newChannel.name} on ${newChannel.guild.name} (was ${oldChannel.name})`);
      }
    }
  });
};