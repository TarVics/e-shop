import { Type } from '@nestjs/common';
import { DECORATORS } from '@nestjs/swagger/dist/constants';
import { isFunction, isString } from '@nestjs/common/utils/shared.utils';

export function getApiModelProperties(type: Type<unknown>): string[] {
  const { prototype } = type;
  if (!prototype) {
    return [];
  }

  const properties =
    Reflect.getMetadata(DECORATORS.API_MODEL_PROPERTIES_ARRAY, prototype) || [];

  return properties
    .filter(isString)
    .filter(
      (key: string) => key.charAt(0) === ':' && !isFunction(prototype[key]),
    )
    .map((key: string) => key.slice(1));
}
