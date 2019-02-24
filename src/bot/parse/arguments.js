const _ = require('lodash');

module.exports = (bot, data, ...args) => {
  _.each(args, (arg) => {
    const argsSplitted = arg.split('=');
    const left = argsSplitted.shift();
    const right = argsSplitted.join("=");

    _.assign(data, {
      [left]: right
    });
  });

  return data;
};
