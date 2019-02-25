module.exports = {
  command: 'unload-command',
  usage: 'Type `$$unload-command COMMAND_NAME` to unload a text command definition',
  restricted: true,
  action(bot, scope, message, cmdPath, command) {
    const com = bot.commands[command];
    if (!com || com.cmdPath !== cmdPath) {
      return `Could not find command \`${cmdPath}/${process.env.BOT_COMMAND_PREFIX}${command}\``;
    }

    const cmd = `../${cmdPath}/${command}`;

    delete require.cache[require.resolve(cmd)];
    delete bot.commands[command]; // eslint-disable-line no-param-reassign

    const msg = `Unloaded command \`${process.env.BOT_COMMAND_PREFIX}${command}\``;

    bot.logging.logInfo(msg);
    return msg;
  },
};
