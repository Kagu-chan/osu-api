/**
 * @interface IDiscordConfiguration
 */
export default interface IDiscordConfiguration {
  discordToken: string,
  discordRetryTimeout: number,
  discordRetryAttemps: number
}