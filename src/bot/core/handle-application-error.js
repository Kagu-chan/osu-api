module.exports = (bot) => {
  process.on('uncaughtException', (err) => {
    console.log('[ERROR]', 'Caught exception:\n', `${err.name}\n${err.message}\n${err.stack}`); // eslint-disable-line no-console

    const { client } = bot;

    if (client && client.status === 0) {
      client.fetchUser(process.env.BOT_OWNER)
        .then(user => user.send(`\`\`\`\n${err.name}\n${err.message}\n${err.stack}\`\`\``))
        .catch(console.log.bind(undefined, 'ERROR')); // eslint-disable-line no-console
    }
  });
};
