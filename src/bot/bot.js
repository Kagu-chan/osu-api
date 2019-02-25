/* eslint-disable global-require */
const _ = require('lodash');

const loadModule = require('./helper/load-module');

const bot = {};

loadModule(bot, 'get/client');
loadModule(bot, 'get/guilds');
loadModule(bot, 'get/channels');
loadModule(bot, 'get/bot-channels');
loadModule(bot, 'get/api-response');

loadModule(bot, 'handle/api-request');

loadModule(bot, 'parse/arguments');

loadModule(bot, 'do/connect');
loadModule(bot, 'do/send');

loadModule(bot, 'event/ready');

loadModule(bot, 'event/channel/create');
loadModule(bot, 'event/channel/delete');
loadModule(bot, 'event/channel/update');

loadModule(bot, 'event/guild/create');
loadModule(bot, 'event/guild/delete');

loadModule(bot, 'event/message');

loadModule(bot, 'register/events');
loadModule(bot, 'register/command');
loadModule(bot, 'register/commands');

_.assign(bot, {
  client: bot.getClient(),
  commands: {},
});

module.exports = bot;
/* eslint-enable global-require */
