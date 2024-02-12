import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

type SwaggerOptions = {
  title: string;
  version: string;
  description: string;
  tag: string;
};

export function setupSwagger(
  app: INestApplication,
  opts: SwaggerOptions,
): void {
  const config = new DocumentBuilder()
    .setTitle(opts.title)
    .setDescription(opts.description)
    .setVersion(opts.version)
    .addTag(opts.tag)
    .addBearerAuth({
      type: 'http',
      // type: "apiKey",
      description:
        'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".',
      name: 'Authorization',
      in: 'header',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
