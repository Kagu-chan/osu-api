/* eslint-disable global-require */
const _ = require('lodash');

const bot = {};

_.assign(bot, {
  getClient: require('./lib/get/client').bind(undefined, bot),
  getGuilds: require('./lib/get/guilds').bind(undefined, bot),
  getChannels: require('./lib/get/channels').bind(undefined, bot),
  getBotChannels: require('./lib/get/bot-channels').bind(undefined, bot),
  getApiReponse: require('./lib/get/api-response').bind(undefined, bot),

  handleApiRequest: require('./lib/handle/api-request').bind(undefined, bot),

  parseArguments: require('./lib/parse/arguments').bind(undefined, bot),

  doConnect: require('./lib/do/connect').bind(undefined, bot),
  doSend: require('./lib/do/send').bind(undefined, bot),

  eventReady: require('./lib/event/ready').bind(undefined, bot),

  eventChannelCreate: require('./lib/event/channel/create').bind(undefined, bot),
  eventChannelDelete: require('./lib/event/channel/delete').bind(undefined, bot),
  eventChannelUpdate: require('./lib/event/channel/update').bind(undefined, bot),

  eventGuildCreate: require('./lib/event/guild/create').bind(undefined, bot),
  eventGuildDelete: require('./lib/event/guild/delete').bind(undefined, bot),

  eventMessage: require('./lib/event/message').bind(undefined, bot),

  registerEvents: require('./lib/register/events').bind(undefined, bot),
  registerCommand: require('./lib/register/command').bind(undefined, bot),
  registerCommands: require('./lib/register/commands').bind(undefined, bot),
});

_.assign(bot, {
  client: bot.getClient(),
  commands: {},
});

module.exports = bot;
/* eslint-enable global-require */
