module.exports = {
  command: 'not-found',
  restricted: false,
  private: true,
  usage: 'not meant to be used directly',
  action(bot, scope) {
    return `Command \`${process.env.BOT_COMMAND_PREFIX}${scope.commandName}\` does not exist! Try out \`${process.env.BOT_COMMAND_PREFIX}help\` or \`${process.env.BOT_COMMAND_PREFIX}commands\``;
  },
};
