module.exports = {
  command: 'get-user',
  restricted: false,
  usage: `Type \`$$get-user USER [m=:mode type=:type event_days=:event_days]\` to retrieve user information.
\`\`\`
* USER       => user name or user id
* mode       => the mode to retrieve informations for. (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
* type       => \`string\` or \`id\` to specify type of \`USER\` parameter if not clear
* event_days => How old should last user events be? Range 1 - 31, default 1
\`\`\`
`,
  action(bot, scope, message, user, ...args) {
    const endPoint = 'get_user';
    const data = {
      u: user,
    };

    if (!user) {
      return 'At least an user name or user id is required';
    }

    return bot.handleApiRequest(message.channel, endPoint, data, ...args);
  },
};
