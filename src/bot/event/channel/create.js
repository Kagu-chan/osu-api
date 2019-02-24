module.exports = (bot) => {
  const { client } = bot;

  client.on('channelCreate', (channel) => {
    if (channel.type === 'text' && channel.name.match(process.env.BOT_CHANNEL_REGEX)) {
      bot.botChannels.push(channel);
      console.log(`Registering newly created channel ${channel.name} on ${channel.guild.name}`);
    }
  });
}