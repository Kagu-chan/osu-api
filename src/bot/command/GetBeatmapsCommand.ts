import * as Joi from 'joi';
import CommandValidator from '../CommandValidator';
import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class GetBeatmapsCommand extends Command {
  public command: string = 'getBeatmaps';
  public readonly scope: CommandScope = CommandScope.STANDARD;

  protected schemaOptions: Joi.JoiObject = Joi.object().keys({
    type: Joi.string()
      .valid('string', 'id')
      .optional(),
    since: Joi.date().optional(),
    s: Joi.string().regex(/\d+/).optional(),
    b: Joi.string().regex(/\d+/).optional(),
    u: Joi.string()
      .optional()
      .when('type', {
        is: 'id',
        then: Joi.string().regex(/\d+/),
      }),
    m: Joi.number()
      .min(0)
      .max(3)
      .optional(),
    a: Joi.number()
      .valid(0, 1)
      .default(0)
      .optional(),
    h: Joi.string()
      .length(32)
      .optional(),
    limit: Joi.number()
      .min(0)
      .max(500)
      .default(500)
      .optional(),
  })
    .without('s', ['b', 'u', 'h'])
    .without('b', ['s', 'u', 'h'])
    .without('u', ['b', 's', 'h'])
    .without('h', ['b', 'u', 's']);

  protected aliases: object = {
    t: 'type',
    m: 'mode',
    userName: 'u',
    user_name: 'u',
    eventDays: 'event_days',
  };

  public async handle(message: Message, args: string[]): Promise<ComposedMessage[]> {
    const parsedArgs: string | object = await CommandValidator.validate(this.schemaOptions, this.aliases, args);

    if (typeof parsedArgs === 'object') {
      this.bot.API.request('get_user', parsedArgs)
        .then((data) => this.bot.API.responseToTextMessage(data))
        .then((chunks: string[]) => new ComposedMessage(this.bot.client, [message.channel], chunks))
        .then((composed) => composed.send());

      return [new ComposedMessage(this.bot.client, [message.channel], 'api.talking')];
    } else {
      return [new ComposedMessage(this.bot.client, [message.channel], 'api.validationError', parsedArgs)];
    }
  }
}
