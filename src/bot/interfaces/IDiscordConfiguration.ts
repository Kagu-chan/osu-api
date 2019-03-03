/**
 * @interface IDiscordConfiguration
 * @private
 * @see IConfiguration
 */
export default interface IDiscordConfiguration {
  discordLoginToken: string,
  discordRetryTimeout: number,
  discordRetryAttemps: number,
  discordOwnerId: string
}