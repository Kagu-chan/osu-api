const Promise = require('bluebird');

module.exports = (bot, message) => Promise.try(() => {
  const parsedData = bot.parseMessage(message);

  const {
    isMessageFromBot,
    isDirectedToBot,
    isDm,
    isKnownChannel,

    commandName,
    commandArguments,
    restricted,

    userName,
    userId,
    allowRestricted,
  } = parsedData;

  let { command } = parsedData;

  /**
   * Cancel if the message
   *  * comes from the bot itself
   *  * is not directed to the bot
   *  * is not directed to a known channel and no direct message
   */
  if (isMessageFromBot || !isDirectedToBot || (!isKnownChannel && !isDm)) {
    return;
  }

  if (restricted) {
    bot.logging.logInfo(
      `${userName} (${userId}) `,
      'used restricted command ',
      `\`${process.env.BOT_COMMAND_PREFIX}${commandName}\` (${message.content})`
    );

    if (!allowRestricted) {
      bot.logging.logInfo('User was not permitted to use the command...');
      command = bot.commands['not-allowed'];
    }
  }

  command.promiseAction(bot, parsedData, message, ...commandArguments)
    .then(data => data && bot.doSend(message.channel, data));
})
  .catch(bot.logging.logError);
