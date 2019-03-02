const Promise = require('bluebird');
const FS = Promise.promisifyAll(require('fs'));
const _ = require('lodash');

module.exports = {
  command: 'release',
  restricted: true,
  usage: 'Type `$$release` to send a release note message to **ALL servers**',
  async action(bot) {
    const channels = bot.botChannels;
    const packageJson = (await FS.readFileAsync('package.json')).toString();
    const versions = (await FS.readFileAsync('RELEASE.json')).toString();
    const currentVersion = JSON.parse(packageJson).version;
    const currentVersionText = JSON.parse(versions)[currentVersion];

    await bot.doSend(
      _.values(channels),
      `**BOT UPDATED!** New version is *v${currentVersion}*\n\`\`\`${currentVersionText.join('\n')}\`\`\``
    );

    return 'Message sent to all listening channels';
  },
};
