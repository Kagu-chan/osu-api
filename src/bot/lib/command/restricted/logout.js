/**
 * @method $$logout
 * @description This command allows the bot owner to log the bot out of Discord
 * @description and closes the connection as well as the whole process.
 */
module.exports = {
  command: 'logout',
  restricted: true,
  usage: 'Type `$$logout` to logout the bot and close the connection to Discord.',
  async action(bot, scope) {
    const { client } = bot;
    const { userName, userId, author } = scope;

    await author.send('Logging out...');
    bot.logging.logInfo(`**LOGGING OUT** (triggered by ${userName} (${userId}))`);

    try {
      /**
       * @function DiscordJS.Client.destroy
       * @see {@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=destroy}
       */
      await client.destroy();
      bot.logging.logInfo('**LOGGED OUT**');

      // Terminate the whole process.
      process.exit(0);
    } catch (error) {
      author.send('**LOGOUT FAILED**');

      // Forward the error through to the next higher instance.
      throw error;
    }

    return false;
  },
};
