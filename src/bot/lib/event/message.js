module.exports = (bot) => {
  const { client } = bot;

  client.on('message', async (receivedMessage) => {
    await bot.handleMessage(receivedMessage);
  });
};
