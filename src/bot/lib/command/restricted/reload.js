const _ = require('lodash');

module.exports = {
  command: 'reload',
  usage: 'Type `$$reload` to reload all servers and commands',
  restricted: true,
  action(bot) {
    bot.logging.logInfo('Reload commands...');
    _.each(bot.commands, ({ command, cmdPath }) => {
      const cmd = `../${cmdPath}/${command}`;

      delete require.cache[require.resolve(cmd)];
    });

    _.assign(bot, {
      commands: {},
    });
    bot.registerCommands();

    bot.logging.logInfo('Reloaded commands\n\nReload channels...');

    const botChannels = bot.getBotChannels();
    _.assign(bot, {
      botChannels,
    });

    bot.logging.logInfo('Reloaded channels.');

    return 'Reloaded server configuration';
  },
};
