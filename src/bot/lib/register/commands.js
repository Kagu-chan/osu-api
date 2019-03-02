module.exports = (bot) => {
  bot.registerCommand('api', 'get-beatmaps');
  bot.registerCommand('api', 'get-user');
  bot.registerCommand('internal', 'commands');
  bot.registerCommand('internal', 'docs');
  bot.registerCommand('internal', 'help');
  bot.registerCommand('internal', 'mods');
  bot.registerCommand('internal', 'ping');
  bot.registerCommand('restricted', 'channels');
  bot.registerCommand('restricted', 'load-command');
  bot.registerCommand('restricted', 'reload-command');
  bot.registerCommand('restricted', 'reload');
  bot.registerCommand('restricted', 'unload-command');
  bot.registerCommand('restricted', 'release');
  bot.registerCommand('restricted', 'maintenance');
  bot.registerCommand('private', 'not-found');
  bot.registerCommand('private', 'not-allowed');
};
