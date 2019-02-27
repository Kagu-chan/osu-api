const _ = require('lodash');

module.exports = (bot) => {
  const guilds = bot.getGuilds();
  const botChannels = {};

  guilds.forEach(((guild) => {
    const channels = bot.getChannels(guild);
    const interestingChannels = _.filter(
      channels,
      channel => channel.type === 'text' && channel.name.match(process.env.BOT_CHANNEL_REGEX)
    );

    _.each(interestingChannels, (channel) => {
      _.assign(botChannels, {
        [channel.id]: channel,
      });
    });
  }));

  return botChannels;
};
