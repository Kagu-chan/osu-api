import { Bot } from './classes';

const bot: Bot = new Bot({
  discordToken: process.env.DISCORD_TOKEN
});

bot.initialize();

async function doStuff() {
  await bot.client.login();
  await bot.client.logout();
}

doStuff();