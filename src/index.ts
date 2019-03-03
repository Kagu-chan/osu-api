import { Bot } from './classes';

const bot: Bot = new Bot({
  discordToken: process.env.DISCORD_TOKEN,
  discordRetryTimeout: 30,
  discordRetryAttemps: 1
});

bot.initialize();

async function doStuff() {
  await bot.client.login(() => {
    return new Promise((resolve) => {
      resolve();
    });
  });
  await bot.client.logout();
}

doStuff();