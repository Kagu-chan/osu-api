module.exports = (bot) => {
  bot.registerCommand('api', 'get-user');
  bot.registerCommand('internal', 'commands');
  bot.registerCommand('internal', 'help');
  bot.registerCommand('internal', 'mods');
  bot.registerCommand('restricted', 'channels');
  bot.registerCommand('restricted', 'load-command');
  bot.registerCommand('restricted', 'reload-command');
  bot.registerCommand('restricted', 'reload');
  bot.registerCommand('restricted', 'unload-command');
};
