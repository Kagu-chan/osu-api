const _ = require('lodash');

module.exports = {
  command: 'reload',
  usage: 'Type `$$reload` to reload all servers and commands',
  restricted: true,
  action(bot) {
    console.log('Reload commands...');
    _.each(bot.commands, ({ command, cmdPath }) => {
      const cmd = `../${cmdPath}/${command}`;

      delete require.cache[require.resolve(cmd)];
    });

    _.assign(bot, {
      commands: {},
    });
    bot.registerCommands();

    console.log('Reloaded commands\n\nReload channels...');

    const botChannels = bot.getBotChannels();
    _.assign(bot, {
      botChannels,
    });

    console.log('Reloaded channels.');

    return 'Reloaded server configuration';
  },
};
