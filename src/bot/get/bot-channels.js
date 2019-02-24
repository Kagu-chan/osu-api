const _ = require('lodash');

module.exports = (bot) => {
  const guilds = bot.getGuilds();
  const botChannels = [];

  guilds.forEach(((guild) => {
    const channels = bot.getChannels(guild);

    botChannels.push(channels.filter((channel) => {
      const { type, name } = channel;
      if (type !== 'text') return false;

      return name.match(process.env.BOT_CHANNEL_REGEX);
    }).array());
  }));

  return _.flatten(botChannels);
};
