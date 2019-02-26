const bot = require('./bot/bot');

bot.initialize(bot);

bot.client.on('error', (err) => {
  console.log('[ERROR]', 'Caught socket exception:\n', `${err.name}\n${err.message}\n${err.stack}`); // eslint-disable-line no-console

  setTimeout(() => {
    bot.doConnect(process.env.BOT_TOKEN);
  }, 5000);
});

process.on('uncaughtException', (err) => {
  console.log('[ERROR]', 'Caught exception:\n', `${err.name}\n${err.message}\n${err.stack}`); // eslint-disable-line no-console

  const { client } = bot;

  client.fetchUser(process.env.BOT_OWNER)
    .then(user => user.send(`\`\`\`\n${err.name}\n${err.message}\n${err.stack}\`\`\``))
    .catch(console.log.bind(undefined, 'ERROR')); // eslint-disable-line no-console
});
