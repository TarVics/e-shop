import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export const ApiFile =
  (fileName = 'file', required = true): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiConsumes('multipart/form-data');
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fileName] : [],
        properties: {
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
