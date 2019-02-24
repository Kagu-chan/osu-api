module.exports = (bot) => {
  bot.eventReady();

  bot.eventChannelCreate();
  bot.eventChannelDelete();
  bot.eventChannelUpdate();

  bot.eventGuildCreate();
  bot.eventGuildDelete();

  bot.eventMessage();
}