const _ = require('lodash');

module.exports = (bot) => {
  const { client } = bot;

  client.on('ready', () => {
    bot.logging.logInfo(`Connected as ${client.user.tag}`);

    _.assign(bot, {
      botChannels: bot.getBotChannels(),
    });

    bot.botChannels.forEach((channel) => {
      bot.logging.logInfo(`Attached to ${channel.name} on ${channel.guild.name}`);
    });
  });
};
