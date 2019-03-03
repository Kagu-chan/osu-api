/**
 * @interface IConfiguration
 */
export default interface IConfiguration {
  /**
   * @var {string} discordLoginToken Discord token to log in
   */
  discordLoginToken: string,

  /**
   * @var {number} discordRetryTimeout Timeout between login retries
   */
  discordRetryTimeout: number,

  /**
   * @var {number} discordRetryTimeout Amount of login attempts before failing with an error
   */
  discordRetryAttemps: number,

  /**
   * The root administrator user
   *
   * @var {string} discordOwnerId The discord bot owner id
   */
  discordOwnerId: string
}