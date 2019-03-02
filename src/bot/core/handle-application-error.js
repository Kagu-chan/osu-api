module.exports = (bot) => {
  process.on('uncaughtException', (err) => {
    bot.logging.logError('Caught exception:\n', `${err.name}\n${err.message}\n${err.stack}`);

    const { client } = bot;

    if (client && client.status === 0) {
      client.fetchUser(process.env.BOT_OWNER)
        .then(user => user.send(`\`\`\`\n${err.name}\n${err.message}\n${err.stack}\`\`\``))
        .catch(bot.logging.logError);
    }
  });
};
