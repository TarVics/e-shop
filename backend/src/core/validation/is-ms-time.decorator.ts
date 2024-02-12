import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';
import ms from 'ms';

export const IS_MS_TIME = 'isMsTime';

export function isMsTime(value: unknown): boolean {
  return typeof value === 'string' && typeof ms(`${value}`) === 'number';
}

export function IsMsTime(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_MS_TIME,
      constraints: [],
      validator: {
        validate: (value): boolean => {
          return isMsTime(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must be a valid ms time value',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
