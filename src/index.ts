import Bot from './bot/Bot';

const bot: Bot = new Bot({
  discordLoginToken: process.env.DISCORD_LOGIN_TOKEN,
  discordRetryTimeout: Number(process.env.DISCORD_LOGIN_RETRY_TIMEOUT),
  discordRetryAttemps: Number(process.env.DISCORD_LOGIN_RETRY_ATTEMPTS),
  discordOwnerId: process.env.DISCORD_BOT_OWNER,
  discordAdministrators: process.env.DISCORD_BOT_ADMINISTRATORS.split(','),
  discordChannelRegexp: process.env.DISCORD_CHANNEL_REGEXP,
  commandPrefix: process.env.COMMAND_PREFIX,
  apiUrl: process.env.API_URL,
  apiKey: process.env.API_KEY,
});

bot.initialize();
bot.run();
