module.exports = {
  command: 'reload-command',
  usage: 'Type `$$reload-command COMMAND_NAME` to reload a text command definition',
  restricted: true,
  action(bot, message, cmdPath, command) {
    const com = bot.commands[command];
    if (!com || com.cmdPath !== cmdPath) {
      return `Could not find command \`${cmdPath}/${process.env.BOT_COMMAND_PREFIX}${command}\``;
    }

    const cmd = `../${cmdPath}/${command}`;

    delete require.cache[require.resolve(cmd)];

    bot.registerCommand(cmdPath, command);

    return `Reloaded command \`${cmdPath}/${process.env.BOT_COMMAND_PREFIX}${command}\``;
  },
};
