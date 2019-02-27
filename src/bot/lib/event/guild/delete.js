const _ = require('lodash');

module.exports = (bot) => {
  const { client } = bot;

  client.on('guildDelete', (guild) => {
    _.assign(bot, {
      botChannels: _.omitBy(bot.botChannels, channel => channel.guild.id !== guild.id),
    });

    bot.logging.logInfo(`Left guild ${guild.name} - channels removed`);
  });
};
