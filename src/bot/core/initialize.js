const connect = require('./connect');
const handleClientError = require('./handle-client-error');
const handleApplicationError = require('./handle-application-error');

module.exports = (bot) => {
  bot.registerEvents();
  bot.registerCommands();

  handleClientError(bot);
  handleApplicationError(bot);

  connect(bot, process.env.BOT_TOKEN, () => {
    bot.logging.logInfo(`Connected as ${bot.client.user.tag}`);
    bot.fetchChannels();
  })
    .catch(() => {
      bot.logging.logError('Connection failure - exit process');
      process.exit(1);
    });
};
