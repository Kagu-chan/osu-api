const _ = require('lodash');

module.exports = (bot) => {
  const { client } = bot;

  client.on('guildCreate', (guild) => {
    const channels = bot.getChannels(guild);
    const allChannels = [
      bot.botChannels,
      channels.filter((channel) => {
        const { type, name } = channel;
        if (type !== 'text') return false;

        return name.match(process.env.BOT_CHANNEL_REGEX);
      }).array(),
    ];

    _.assign(bot, {
      botChannels: _.flatten(allChannels),
    });

    bot.logging.logInfo(`Joined guild ${guild.name} - channels updated`);
  });
};
