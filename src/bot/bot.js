/* eslint-disable global-require */
const _ = require('lodash');

const bot = {};

_.assign(bot, {
  getClient: require('./get/client').bind(undefined, bot),
  getGuilds: require('./get/guilds').bind(undefined, bot),
  getChannels: require('./get/channels').bind(undefined, bot),
  getBotChannels: require('./get/bot-channels').bind(undefined, bot),
  getApiReponse: require('./get/api-response').bind(undefined, bot),

  handleApiRequest: require('./handle/api-request').bind(undefined, bot),

  parseArguments: require('./parse/arguments').bind(undefined, bot),

  doConnect: require('./do/connect').bind(undefined, bot),
  doSend: require('./do/send').bind(undefined, bot),

  eventReady: require('./event/ready').bind(undefined, bot),

  eventChannelCreate: require('./event/channel/create').bind(undefined, bot),
  eventChannelDelete: require('./event/channel/delete').bind(undefined, bot),
  eventChannelUpdate: require('./event/channel/update').bind(undefined, bot),

  eventGuildCreate: require('./event/guild/create').bind(undefined, bot),
  eventGuildDelete: require('./event/guild/delete').bind(undefined, bot),

  eventMessage: require('./event/message').bind(undefined, bot),

  registerEvents: require('./register/events').bind(undefined, bot),
  registerCommand: require('./register/command').bind(undefined, bot),
  registerCommands: require('./register/commands').bind(undefined, bot),
});

_.assign(bot, {
  client: bot.getClient(),
  commands: {},
});

module.exports = bot;
/* eslint-enable global-require */
