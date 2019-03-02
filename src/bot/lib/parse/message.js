const _ = require('lodash');

module.exports = (bot, message) => {
  const { client, botChannels, commands } = bot;
  const { content, author, channel } = message;
  const { type } = channel;

  const isMessageFromBot = author === client.user;
  const isDirectedToBot = content.startsWith(process.env.BOT_COMMAND_PREFIX);
  const isDm = type === 'dm';

  const channelId = channel.id;
  const knownChannel = botChannels[channelId];

  const {
    commandName,
    commandArguments,
  } = bot.parseArguments(content.replace(process.env.BOT_COMMAND_PREFIX, ''));

  const command = _.get(commands, commandName, bot.commands['not-found']);
  const { restricted } = command;

  const allowRestricted = author.id === process.env.BOT_OWNER;

  return {
    isMessageFromBot,
    isDirectedToBot,
    isDm,
    isKnownChannel: !!knownChannel,

    commandName,
    commandArguments,
    command,
    restricted,

    userName: author.username,
    userId: author.id,
    allowRestricted,
  };
};
