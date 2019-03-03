import { Bot } from './classes';

const bot: Bot = new Bot({
  discordLoginToken: process.env.DISCORD_LOGIN_TOKEN,
  discordOwnerId: process.env.DISCORD_BOT_OWNER,
  discordRetryTimeout: Number(process.env.DISCORD_LOGIN_RETRY_TIMEOUT),
  discordRetryAttemps: Number(process.env.DISCORD_LOGIN_RETRY_ATTEMPTS)
});

bot.initialize();
bot.run();