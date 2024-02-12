import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ClassConstructor } from 'class-transformer/types/interfaces';

export function validateObject(
  object: Record<string, any>,
  validateClass: ClassConstructor<any>,
) {
  const result = plainToClass(validateClass, object, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(result, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return result;
}
