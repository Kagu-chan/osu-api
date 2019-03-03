import { Bot } from './classes';

const bot: Bot = new Bot({
  discordToken: process.env.DISCORD_TOKEN,
  discordRetryTimeout: 30,
  discordRetryAttemps: 1
});

bot.initialize();
bot.run();