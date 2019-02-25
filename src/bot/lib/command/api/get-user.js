module.exports = {
  command: 'get-user',
  restricted: false,
  usage: `Type \`$$get-user USER [m=:mode type=:type event_days=:event_days]\` to retrieve general user information.
\`\`\`
* USER       => specify a user_id or a username to return metadata from
* mode       => mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania). Optional, default value is 0.
* type       => specify if \`user\` is a user_id or a username. Use \`string\` for usernames or \`id\` for user_ids. Optional, default behaviour is automatic recognition (may be problematic for usernames made up of digits only).
* event_days => Max number of days between now and last event date. Range of 1-31. Optional, default value is 1.
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
