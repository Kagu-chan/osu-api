const _ = require('lodash');
const Promise = require('bluebird');

module.exports = (bot, cmdPath, command) => {
  const path = `../command/${cmdPath}/${command}.js`;
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const commandObject = require(path);

  _.assign(commandObject, {
    cmdPath,
    promiseAction: (...args) => Promise.try(() => commandObject.action(...args))
      .catch(bot.logging.logError),
  });

  _.assign(bot.commands, {
    [command]: commandObject,
  });

  bot.logging.logInfo(`Registered command ${cmdPath}/${command}`);
};
