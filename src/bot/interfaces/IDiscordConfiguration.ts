/**
 * @interface IDiscordConfiguration
 * @private
 * @see IConfiguration
 */
export default interface IDiscordConfiguration {
  /**
   * @var {string} discordLoginToken Discord token to log in
   */
  discordLoginToken: string;

  /**
   * @var {number} discordRetryTimeout Timeout between login retries
   */
  discordRetryTimeout: number;

  /**
   * @var {number} discordRetryTimeout Amount of login attempts before failing with an error
   */
  discordRetryAttemps: number;

  /**
   * The root administrator user
   *
   * @var {string} discordOwnerId The discord bot owner id
   */
  discordOwnerId: string;

  /**
   * Other administrator users
   *
   * @var {string[]} discordAdministrators The discord bot administrators, separated by `,`
   */
  discordAdministrators: string[];

  /**
   * The regular expression to match for the bot relevant channel names
   *
   * @var {string} discordChannelRegexp The regular expression
   */
  discordChannelRegexp: string;
}
