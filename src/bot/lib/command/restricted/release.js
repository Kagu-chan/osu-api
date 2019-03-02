const Promise = require('bluebird');
const FS = Promise.promisifyAll(require('fs'));
const _ = require('lodash');

module.exports = {
  command: 'release',
  restricted: true,
  usage: 'Type `$$release` to send a release note message to **ALL servers**',
  async action(bot) {
    const channels = bot.botChannels;
    const version = (await FS.readFileAsync('VERSION')).toString();
    const versions = (await FS.readFileAsync('RELEASE.json')).toString();
    const currentVersionText = JSON.parse(versions)[version];

    await bot.doSend(
      _.values(channels),
      `**BOT UPDATED!** New version is *v${version}*\n\`\`\`${currentVersionText.join('\n')}\`\`\``
    );

    return 'Message sent to all listening channels';
  },
};
