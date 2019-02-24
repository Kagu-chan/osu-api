const _ = require('lodash');

module.exports = (bot, cmdPath, command) => {
  const path = `../command/${cmdPath}/${command}.js`;
  const commandObject = require(path);

  _.assign(commandObject, {
    cmdPath
  })
  _.assign(bot.commands, {
    [command]: commandObject
  });
  
  console.log(`Registered command ${cmdPath}/${command}`);
};
