/**
 * @interface IDiscordConfiguration
 * @private
 * @see IConfiguration
 */
export default interface IDiscordConfiguration {
  discordToken: string,
  discordRetryTimeout: number,
  discordRetryAttemps: number
}