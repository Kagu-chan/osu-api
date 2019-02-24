const _ = require('lodash');

const help = msg => msg.replace(/\$\$/g, process.env.BOT_COMMAND_PREFIX);

module.exports = {
  command: 'help',
  usage: 'Type `$$help [COMMAND]` to get help for the command.\n\nType `$$help` to see this message.',
  restricted: false,
  action(bot, message, command) {
    if (command) {
      const commandObject = bot.commands[command];

      if (commandObject.restricted && message.author.id !== process.env.BOT_OWNER) {
        return 'You\'re not permitted to use this command!';
      }

      if (commandObject) {
        if (_.isString(commandObject.usage)) {
          return help(commandObject.usage);
        }
        return commandObject.usage(bot, message, help);
      }
      return `Command \`${process.env.BOT_COMMAND_PREFIX}${command}\` does not exist!`;
    }
    return help(bot.commands.help.usage);
  },
};
