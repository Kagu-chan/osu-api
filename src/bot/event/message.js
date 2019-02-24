const _ = require('lodash');

module.exports = (bot) => {
  const { client } = bot;

  client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages or messages not directed to him
    if (receivedMessage.author === client.user || !receivedMessage.content.startsWith(process.env.BOT_COMMAND_PREFIX)) {
      return
    }

    // Ignore messages in channels the bot is not listening to
    const channelId = receivedMessage.channel.id;
    const knownChannel = _.find(bot.botChannels, ch => ch.id === channelId);

    if (receivedMessage.channel.type !== 'dm' && !knownChannel) {
      return;
    }

    const commandArguments = receivedMessage.content.replace(process.env.BOT_COMMAND_PREFIX, '').split(' ');
    const commandName = commandArguments.shift();

    const command = bot.commands[commandName];

    if (!command) {
      receivedMessage.channel.send(`Command \`${process.env.BOT_COMMAND_PREFIX}${commandName}\` does not exist! Try out \`${process.env.BOT_COMMAND_PREFIX}help\` or \`${process.env.BOT_COMMAND_PREFIX}commands\``);
      return;
    }

    if (command.restricted) {
      console.log(`${receivedMessage.author.username} (${receivedMessage.author.id}) used restricted command \`${process.env.BOT_COMMAND_PREFIX}${commandName}\` (${receivedMessage.content})`);
    }
    if (command.restricted && receivedMessage.author.id !== process.env.BOT_OWNER) {
      console.log('User was not permitted to use the command...');
      receivedMessage.channel.send('You\'re not permitted to use this command!');
      return;
    }

    const result = command.action(bot, receivedMessage, ...commandArguments);
    if (result) {
      receivedMessage.channel.send(result);
    }
  });
};
