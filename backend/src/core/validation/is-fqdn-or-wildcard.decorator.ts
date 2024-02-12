import { buildMessage, isFQDN, ValidateBy } from 'class-validator';
import ValidatorJS from 'validator';
import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';

export const IS_FQDN_OR_WILDCARD = 'isFqdnOrWildcard';

export function isFqdnOrWildcard(
  value: unknown,
  validationOptions?: ValidatorJS.IsFQDNOptions,
): boolean {
  return (
    typeof value === 'string' &&
    (value === '*' || isFQDN(value, validationOptions))
  );
}

export function IsFqdnOrWildcard(
  options?: ValidatorJS.IsFQDNOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_FQDN_OR_WILDCARD,
      constraints: [options],
      validator: {
        validate: (value, args) =>
          isFqdnOrWildcard(
            value,
            args === null || args === void 0 ? void 0 : args.constraints[0],
          ),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a valid domain name',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
