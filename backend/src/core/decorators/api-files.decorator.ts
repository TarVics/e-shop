import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ApiFiles =
  (fileNames: string[] = ['file'], nullable = false): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const properties = fileNames.reduce((acc, name) => {
      acc[name] = {
        type: 'string',
        format: 'binary',
        nullable,
      };
      return acc;
    }, {} as Record<string, SchemaObject>);
    ApiConsumes('multipart/form-data');
    ApiBody({
      schema: {
        type: 'object',
        properties,
      },
    })(target, propertyKey, descriptor);
  };
