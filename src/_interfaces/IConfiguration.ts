/**
 * @interface IConfiguration
 * @since 0.3.0
 */
export default interface IConfiguration {
  discordToken: string,
  discordRetryTimeout: number,
  discordRetryAttemps: number
}