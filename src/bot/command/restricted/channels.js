const _ = require('lodash');

module.exports = {
  command: 'channels',
  restricted: true,
  usage: 'Type \`$$channels\` to get info about the server',
  action(bot, message, ...args) {
    const guilds = bot.getGuilds().array();
    const channels = bot.botChannels;

    const msg = ['```', 'Servers:'];

    msg.push(_.map(guilds, g => `  ${g.name}`));

    msg.push('Channels:');
    msg.push(_.map(channels, c => `  ${c.name}`));

    msg.push('');
    msg.push('Server -> Client references:');

    _.each(guilds, (guild) => {
      const gid = guild.id;

      msg.push(`  ${guild.name}`);
      msg.push(_.chain(channels)
        .filter(ch => ch.guild.id === gid)
        .map(ch => `    ${ch.name}`)
        .value());
    });

    msg.push('```');
    return _.flatten(msg).join('\n');
  }
}