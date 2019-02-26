module.exports = (bot) => {
  bot.doConnect(process.env.BOT_TOKEN);

  bot.registerEvents();
  bot.registerCommands();
};
