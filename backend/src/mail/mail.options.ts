import {
  ConfigModule,
  ConfigObject,
  ConfigType,
  registerAs,
} from '@nestjs/config';
import { join } from 'node:path';

import { HelperDeclareSpec } from 'handlebars';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { MailerOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { validateObject } from '../core/utils';
import { MailVariables } from './mail.validate';

const helpers: HelperDeclareSpec = {
  currentYear: () => new Date().getFullYear(),
  inc: (value) => parseInt(value) + 1,
};

export function mailFactory(config: ConfigObject): MailerOptions {
  validateObject(config, MailVariables);

  return {
    // transport: config.MAIL_TRANSPORT,
    // or

    transport: {
      service: config.MAIL_SERV || undefined,
      host: config.MAIL_HOST || undefined,
      port: config.MAIL_PORT || undefined,
      // secure: false,
      auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS,
      },
      logger: config.NODE_ENV === 'development',
    },
    defaults: {
      //from: `"No Reply" <${config.MAIL_FROM}>`,
      from: {
        name: 'No Reply',
        address: config.MAIL_FROM,
      },
    },
    // preview: true,
    template: {
      dir: join(__dirname, 'templates', 'views'),
      adapter: new HandlebarsAdapter(helpers, {
        inlineCssOptions: {
          url: ' ',
          preserveMediaQueries: true,
        },
      }), // or new PugAdapter() or new EjsAdapter()
      options: {
        strict: true,
      },
    },
    options: {
      partials: {
        dir: join(__dirname, 'templates'),
        options: {
          strict: true,
        },
      },
    },
  };
}

export const MailConfig = registerAs('mail', () => mailFactory(process.env));

export const mailOptions: MailerAsyncOptions = {
  imports: [ConfigModule.forFeature(MailConfig)],
  inject: [MailConfig.KEY],
  useFactory: (config: ConfigType<typeof MailConfig>) => config,
};
