const _ = require('lodash');

module.exports = {
  command: 'maintenance',
  restricted: true,
  usage: 'Type `$$maintenance` to send a maintenance note message to **ALL servers**',
  async action(bot) {
    const channels = bot.botChannels;

    await bot.doSend(
      _.values(channels),
      '**BOT MAINTENANCE!** Bot is going down for maintenance soon - Please be pacient'
    );

    return 'Message sent to all listening channels';
  },
};
