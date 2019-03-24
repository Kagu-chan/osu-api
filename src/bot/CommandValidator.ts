import * as Joi from 'joi';
import * as _ from 'lodash';
import CommandParser from './command/CommandParser';

export default class CommandValidator {
  public static async validate(schema: Joi.JoiObject, definitions: object, args: string[]): Promise<object | string> {
    const parsed = this.parseCommands(definitions, args);

    return new Promise((resolve, reject) => {
      Joi.validate(parsed, schema, {}, (err, val) => {
        if (!err) {
          resolve(val);
        } else {
          resolve(err.message);
        }
      });
    });
  }

  private static parseCommands(
    definition: {
      first?: string[]
    },
    args: string[]
  ): object {
    const parsed = {};

    // Native object cloning was not enough to loose references here - so only first object would be parsed properly
    const def = _.cloneDeep(definition);

    let current;
    let key;
    let value;

    if (def.first && def.first.length) {
      while (def.first.length && args.length) {
        if (args[0].indexOf('=') < 0) {
          key = def.first.shift();
          parsed[key] = args.shift();
        }
      }
    }

    while (args.length) {
      current = args.shift();

      [key, value] = CommandParser.headTail(current, '=');

      if (!value) {
        value = key;
      }

      if (def[key]) {
        parsed[def[key]] = value;
      } else {
        parsed[key] = value;
      }
    }

    return parsed;
  }
}
