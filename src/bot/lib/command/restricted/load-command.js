const FS = require('fs');

module.exports = {
  command: 'load-command',
  usage: 'Type `$$load-command COMMAND_NAME` to load a text command definition',
  restricted: true,
  action(bot, message, cmdPath, command) {
    if (bot.commands[command]) {
      return `Command \`${process.env.BOT_COMMAND_PREFIX}${command}\` is already loaded. Unload or reload instead!`;
    }

    if (cmdPath && command && FS.existsSync(`src/bot/lib/command/${cmdPath}/${command}.js`)) {
      bot.registerCommand(cmdPath, command);

      return `Loaded command \`${cmdPath}/${process.env.BOT_COMMAND_PREFIX}${command}\``;
    }
    return `Could not find command \`${cmdPath}/${process.env.BOT_COMMAND_PREFIX}${command}\``;
  },
};
