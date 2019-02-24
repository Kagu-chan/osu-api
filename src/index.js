require('dotenv').config();

const bot = require('./bot/bot');

bot.doConnect(process.env.BOT_TOKEN);

bot.registerEvents();
bot.registerCommands();

bot.client.on('error', (err) => {
  console.log('Caught socket exception:\n', `${err.name}\n${err.message}\n${err.stack}`);

  setTimeout(() => {
    bot.doConnect(process.env.BOT_TOKEN);
  }, 5000);
});

process.on('uncaughtException', (err) => {
  console.log('Caught exception:\n', `${err.name}\n${err.message}\n${err.stack}`);

  const { client } = bot;

  client.fetchUser(process.env.BOT_OWNER)
    .then(user => user.send(`\`\`\`\n${err.name}\n${err.message}\n${err.stack}\`\`\``))
    .catch(console.log);
});
