module.exports = {
  command: 'not-allowed',
  restricted: false,
  private: true,
  usage: 'not meant to be used directly',
  action(bot, scope) {
    return `You're not allowed to execute \`${process.env.BOT_COMMAND_PREFIX}${scope.commandName}\`.`;
  },
};
