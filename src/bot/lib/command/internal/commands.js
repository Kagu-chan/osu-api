const _ = require('lodash');

module.exports = {
  command: 'commands',
  restricted: false,
  usage: 'Type `$$commands` to get a list of commands available for you',
  action(bot, scope, message) {
    const result = [
      '```',
      'Available commands:',
    ];

    result.push(_.chain(bot.commands)
      .filter(cmd => !cmd.restricted && !cmd.private)
      .map(cmd => `  ${cmd.command}`)
      .value());

    if (message.author.id === process.env.BOT_OWNER) {
      result.push(['', 'Restricted commands:']);

      result.push(_.chain(bot.commands)
        .filter(cmd => cmd.restricted && !cmd.private)
        .map(cmd => `  ${cmd.command}`)
        .value());
    }

    result.push('```');

    return _.flatten(result).join('\n');
  },
};
