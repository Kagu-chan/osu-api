const connect = require('./connect');

module.exports = (bot) => {
  bot.client.on('error', (err) => {
    bot.logging.logError('client error:\n', `${err.name}\n${err.message}\n${err.stack}`); // eslint-disable-line no-console

    setTimeout(() => {
      connect(bot, process.env.BOT_TOKEN);
    }, 5000);
  });
};
