const _ = require('lodash');

module.exports = (bot) => {
  const { client } = bot;

  client.on('ready', () => {
    console.log(`Connected as ${client.user.tag}`);

    _.assign(bot, {
      botChannels: bot.getBotChannels(),
    });

    bot.botChannels.forEach((channel) => {
      console.log(`Attached to ${channel.name} on ${channel.guild.name}`);
    });
  });
};
