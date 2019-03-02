module.exports = (bot) => {
  bot.eventChannelCreate();
  bot.eventChannelDelete();
  bot.eventChannelUpdate();

  bot.eventGuildCreate();
  bot.eventGuildDelete();

  bot.eventMessage();
};
