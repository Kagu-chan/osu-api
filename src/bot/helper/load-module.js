const path = require('path');
const _ = require('lodash');

module.exports = (bot, subPath) => {
  const fnName = subPath.replace(/[/-](\w)/gi, (c, p1) => p1.toUpperCase());
  const fnPath = path.join(__dirname, '..', 'lib', subPath);
  const fn = require(fnPath); // eslint-disable-line global-require, import/no-dynamic-require

  _.assign(bot, {
    [fnName]: fn.bind(undefined, bot),
  });
};
