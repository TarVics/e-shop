import {
  buildMessage,
  isPort,
  ValidateBy,
  ValidationOptions,
} from 'class-validator';

export const IS_PORT_NUMBER = 'isPortNumber';

export function isPortNumber(value: unknown): boolean {
  return typeof value === 'number' && isPort(`${value}`);
}

export function IsPortNumber(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_PORT_NUMBER,
      constraints: [],
      validator: {
        validate: (value): boolean => {
          return isPortNumber(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a valid port number',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
