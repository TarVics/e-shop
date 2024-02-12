import {
  buildMessage,
  isURL,
  ValidateBy,
  ValidationOptions,
} from 'class-validator';
import ValidatorJS from 'validator';

export const IS_URL_OR_WILDCARD = 'isUrlOrWildcard';

export function isUrlOrWildcard(
  value: unknown,
  options?: ValidatorJS.IsURLOptions,
): boolean {
  return typeof value === 'string' && (value === '*' || isURL(value, options));
}

export function IsUrlOrWildcard(
  options?: ValidatorJS.IsURLOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_URL_OR_WILDCARD,
      constraints: [options],
      validator: {
        validate: (value, args): boolean =>
          isUrlOrWildcard(value, args?.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a URL address',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
