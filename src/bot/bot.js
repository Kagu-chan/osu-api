const _ = require('lodash');

const loadModule = require('./helper/load-module');
const initialize = require('./helper/initialize');

const bot = {};

loadModule(bot, 'get/client');
loadModule(bot, 'get/guilds');
loadModule(bot, 'get/channels');
loadModule(bot, 'get/bot-channels');
loadModule(bot, 'get/api-response');

loadModule(bot, 'handle/api-request');
loadModule(bot, 'handle/message');

loadModule(bot, 'parse/arguments');
loadModule(bot, 'parse/message');

loadModule(bot, 'do/connect');
loadModule(bot, 'do/send');

loadModule(bot, 'fetch/channels');

loadModule(bot, 'event/channel/create');
loadModule(bot, 'event/channel/delete');
loadModule(bot, 'event/channel/update');

loadModule(bot, 'event/guild/create');
loadModule(bot, 'event/guild/delete');

loadModule(bot, 'event/message');

loadModule(bot, 'register/events');
loadModule(bot, 'register/command');
loadModule(bot, 'register/commands');

loadModule(bot, 'log/error');
loadModule(bot, 'log/info');

_.assign(bot, {
  initialize,
  client: bot.getClient(),
  commands: {},
});

module.exports = bot;
