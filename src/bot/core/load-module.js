const path = require('path');
const _ = require('lodash');

module.exports = (bot, subPath) => {
  const fnName = subPath.replace(/[/-](\w)/gi, (c, p1) => p1.toUpperCase());
  const fnPath = path.join(__dirname, '..', 'lib', subPath);
  const fn = require(fnPath); // eslint-disable-line global-require, import/no-dynamic-require

  let target = bot;

  if (fn.namespace) {
    target = _.get(bot, fn.namespace, false);
    if (!target) {
      _.set(bot, fn.namespace, {});
      target = _.get(bot, fn.namespace);
    }
  }

  _.assign(target, {
    [fnName]: fn.bind(undefined, bot),
  });
};
