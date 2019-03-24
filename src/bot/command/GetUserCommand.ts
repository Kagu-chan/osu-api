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
    mode: Joi.number()
      .min(0)
      .max(3)
      .default(0)
      .optional(),
    eventDays: Joi.number()
      .min(1)
      .max(31)
      .default(1)
      .optional(),
    type: Joi.string()
      .valid('string', 'id')
      .optional(),
    userName: Joi.string()
      .required()
      .when('type', {
        is: 'id',
        then: Joi.string().regex(/\d+/),
      }),
  });

  protected aliases: object = {
    first: ['userName'],
    m: 'mode',
    t: 'type',
    u: 'userName',
  };

  public async handle(message: Message, args: string[]): Promise<ComposedMessage[]> {
    const parsedArgs: string | object = await CommandValidator.validate(this.schemaOptions, this.aliases, args);

    if (typeof parsedArgs === 'object') {
      return [new ComposedMessage(this.bot.client, [message.channel], 'api.talking')];
    } else {
      return [new ComposedMessage(this.bot.client, [message.channel], 'api.validationError', parsedArgs)];
    }
  }
}
