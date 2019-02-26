module.exports = {
  command: 'get-beatmaps',
  restricted: false,
  usage: `Type \`$$get-beatmaps [since=:since s=:set_id b=:map_id u=:user type=:type m=:mode a=:converted h=:hash limit=:limit]\` to retrieve general beatmap information.
\`\`\`
* since     => return all beatmaps ranked or loved since this date. Must be a MySQL date. In UTC
* set_id    => specify a beatmapset_id to return metadata from.
* map_id    => specify a beatmap_id to return metadata from.
* user      => specify a user_id or a username to return metadata from.
* type      => specify if \`user\` is a user_id or a username. Use \`string\` for usernames or \`id\` for user_ids. Optional, default behaviour is automatic recognition (may be problematic for usernames made up of digits only).
* mode      => mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania). Optional, maps of all modes are returned by default.
* converted => specify whether converted beatmaps are included (0 = not included, 1 = included). Only has an effect if \`mode\` is chosen and not 0. Converted maps show their converted difficulty rating. Optional, default is 0.
* hash      => the beatmap hash. It can be used, for instance, if you're trying to get what beatmap has a replay played in, as .osr replays only provide beatmap hashes (example of hash: a5b99395a42bd55bc5eb1d2411cbdf8b). Optional, by default all beatmaps are returned independently from the hash.
* limit     => amount of results. Optional, default and maximum are 500.
\`\`\`
`,
  action(bot, scope, message, ...args) {
    const endPoint = 'get_beatmaps';
    const data = {};

    return bot.handleApiRequest(message.channel, endPoint, data, ...args);
  },
};
