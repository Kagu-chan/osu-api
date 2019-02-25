const _ = require('lodash');

module.exports = (bot) => {
  const { client } = bot;

  client.on('guildDelete', (guild) => {
    const channels = bot.botChannels.filter(channel => channel.guild.id !== guild.id);

    _.assign(bot, {
      botChannels: channels,
    });

    bot.logging.logInfo(`Left guild ${guild.name} - channels removed`);
  });
};
