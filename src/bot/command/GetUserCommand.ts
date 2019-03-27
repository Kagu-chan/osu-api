import * as Joi from 'joi';
import CommandValidator from '../CommandValidator';
import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class GetUserCommand extends Command {
  public command: string = 'getUser';
  public readonly scope: CommandScope = CommandScope.STANDARD;

  protected schemaOptions: Joi.JoiObject = Joi.object().keys({
    m: Joi.number()
      .min(0)
      .max(3)
      .default(0)
      .optional(),
    event_days: Joi.number()
      .min(1)
      .max(31)
      .default(1)
      .optional(),
    type: Joi.string()
      .valid('string', 'id')
      .optional(),
    u: Joi.string()
      .required()
      .when('type', {
        is: 'id',
        then: Joi.string().regex(/\d+/),
      }),
  });

  protected aliases: object = {
    first: ['u'],
    t: 'type',
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
