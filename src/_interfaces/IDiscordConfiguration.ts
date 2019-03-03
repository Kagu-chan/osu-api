/**
 * @interface IDiscordConfiguration
 * @since 0.3.0
 */
export default interface IDiscordConfiguration {
  discordToken: string,
  discordRetryTimeout: number,
  discordRetryAttemps: number
}