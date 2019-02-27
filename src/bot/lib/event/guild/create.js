const _ = require('lodash');

module.exports = (bot) => {
  const { client } = bot;

  client.on('guildCreate', (guild) => {
    const channels = bot.getChannels(guild);
    const newChannels = _.filter(
      channels,
      channel => channel.type === 'text' && channel.name.match(process.env.BOT_CHANNEL_REGEX)
    );

    _.each(newChannels, (channel) => {
      _.assign(bot.botChannels, {
        [channel.id]: channel,
      });
    });

    bot.logging.logInfo(`Joined guild ${guild.name} - channels updated`);
  });
};
