module.exports = (bot) => {
  bot.registerEvents();
  bot.registerCommands();

  bot.doConnect(process.env.BOT_TOKEN, () => {
    bot.logging.logInfo(`Connected as ${bot.client.user.tag}`);
    bot.fetchChannels();
  })
    .catch(() => {
      bot.logging.logError('Connection failure - exit process');
      process.exit(1);
    });
};
