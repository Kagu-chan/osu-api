import { Collection, Guild, Snowflake, TextChannel } from 'discord.js';
import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class ChannelsCommand extends Command {
  public command: string = 'channels';
  public readonly scope: CommandScope = CommandScope.ONLY_DM | CommandScope.ONLY_OWNERS | CommandScope.SECRET_ON_ERROR;

  public handle(message: Message): ComposedMessage[] {
    const channelsMessage = [
      this.translationInterface.__('commands.channels.header'),
    ];

    const guilds = this.bot.client.getConnectedGuilds();

    guilds.forEach((guild: Guild, guildId: Snowflake) => {
      const channels: Collection<string, TextChannel> = this.bot.client.getRelevantGuildChannels(guild);

      channelsMessage.push(`${guild.name} (${guildId})\n`);
      channels.forEach((channel: TextChannel, channelId: Snowflake) => {
        channelsMessage.push(`\t${channel.name} (${channelId})\n`);
      });

      channelsMessage.push('\n');
    });

    channelsMessage.push(this.translationInterface.__('commands.channels.footer'));

    return [new ComposedMessage(
      this.bot.client,
      [message.channel],
      'empty',
      channelsMessage.join('')
    )];
  }
}
