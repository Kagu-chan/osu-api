/**
 * @interface IConfiguration
 */
export default interface IConfiguration {
  /**
   * @var {string} discordToken Discord token to log in
   */
  discordToken: string,

  /**
   * @var {number} discordRetryTimeout Timeout between login retries
   */
  discordRetryTimeout: number,

  /**
   * @var {number} discordRetryTimeout Amount of login attempts before failing with an error
   */
  discordRetryAttemps: number
}