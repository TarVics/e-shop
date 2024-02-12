import { ConfigService, ConfigType } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import Mail from 'nodemailer/lib/mailer';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

import { AuthUser } from '../auth/entities';
import { AppConfig, FrontendConfig } from '../app/app.options';
import { JwtConfig } from '../auth/auth.options';
import { MailConfig } from './mail.options';
import { TokenKind } from '../auth/enums';
import { I18nLocale } from '../core/enums';

@Injectable()
export class MailService implements OnModuleInit {
  private jwt: ConfigType<typeof JwtConfig>;
  private app: ConfigType<typeof AppConfig>;
  private frontend: ConfigType<typeof FrontendConfig>;

  constructor(
    @Inject(MailConfig.KEY)
    private mail: ConfigType<typeof MailConfig>,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    this.app = this.configService.get<typeof AppConfig>('app', { infer: true });
    this.frontend = this.configService.get<typeof AppConfig>('frontend', {
      infer: true,
    });
    this.jwt = this.configService.get<typeof FrontendConfig>('jwt', {
      infer: true,
    });
  }

  private makeSendMailOptions(user: AuthUser): ISendMailOptions {
    const options = this.mail.defaults as Mail.Options;
    const address = (options.from as Mail.Address).address;

    return {
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      from: `"Support Team" <${address}>`,
      context: {
        // ✏️ filling curly brackets with content
        appName: this.app.name,
        appWelcome: this.app.welcome,
        companyName: this.app.company,
        frontendURL: this.frontend.url,
        userName: user.fullName,
      },
    };
  }

  private makeMailOptions(
    user: AuthUser,
    kind: TokenKind,
    url: string
  ): ISendMailOptions {
    // const options = this.mail.defaults as Mail.Options;
    // const address = (options.from as Mail.Address).address;

    const { context, ...options } = this.makeSendMailOptions(user);

    return {
      ...options,
      context: {
        ...context,
        tokenExpire: parseInt(this.jwt.tokens[kind].expire, 10),
        url,
      },
      // to: user.email,
      // // from: '"Support Team" <support@example.com>', // override default from
      // from: `"Support Team" <${address}>`,
      // context: { // ✏️ filling curly brackets with content
      //   appName: this.app.name,
      //   appWelcome: this.app.welcome,
      //   companyName: this.app.company,
      //   frontendURL: this.frontend.url,
      //   tokenExpire: parseInt(this.jwt.tokens[kind].expire, 10),
      //   userName: user.fullName,
      //   url,
      // }
    };
  }

  sendUserRegisterConfirm(
    user: AuthUser,
    token: string,
    locale: I18nLocale,
  ): void {
    const lang: string = locale.slice(0, 2) || 'en';

    const url = `${this.frontend.url || ''}${
      this.frontend.register_uri || ''
    }?token=${token}`;

    const options: ISendMailOptions = this.makeMailOptions(
      user,
      TokenKind.Register,
      url
    );

    const subject: string =
      lang === 'uk'
        ? this.app.name + ' Підтвердження електронної пошти'
        : this.app.name + ' Confirm your Email';

    this.mailerService
      .sendMail({
        ...options,
        subject,
        template: `./register-confirm-${lang}`, // `.hbs` extension is appended automatically
      })
      // .then(() => {})
      .catch((e: Error): void => {
        Logger.error(e.message, e.stack, 'Sendmail');
      });
  }

  sendUserRecoverPassword(
    user: AuthUser,
    token: string,
    locale: I18nLocale,
  ): void {
    const lang: string = locale.slice(0, 2) || 'en';

    const url = `${this.frontend.url || ''}${
      this.frontend.recover_uri || ''
    }?token=${token}`;

    const options: ISendMailOptions = this.makeMailOptions(
      user,
      TokenKind.Recover,
      url
    );

    const subject: string =
      lang === 'uk'
        ? this.app.name + ' Відновлення паролю'
        : this.app.name + ' Recover your Password';

    this.mailerService
      .sendMail({
        ...options,
        subject,
        template: `./recover-password-${lang}`, // `.hbs` extension is appended automatically
      })
      // .then(() => {})
      .catch((e: Error): void => {
        Logger.error(e.message, e.stack, 'Sendmail');
      });
  }

  sendOrderResult(
    user: AuthUser,
    isUser: boolean,
    data: Record<string, any>,
  ): void {
    const lang: string = data.options?.lang.slice(0, 2) || 'en';

    const { context, ...options } = this.makeSendMailOptions(user);

    const subject: string =
      lang === 'uk'
        ? isUser
          ? this.app.name + `. Ваша заявка №${data.order.id} прийнята`
          : this.app.name + `. Заявка №${data.order.id} прийнята`
        : isUser
        ? this.app.name + `. Your order No.${data.order.id} has been accepted`
        : this.app.name + `. Order No.${data.order.id} has been accepted`;

    const sendMailOptions: ISendMailOptions = {
      ...options,
      subject,
      template: `./order-result-${isUser ? 'user' : 'operator'}-${lang}`,
      context: {
        ...context,
        ...data,
      },
    };

    this.mailerService
      .sendMail(sendMailOptions)
      // .then(() => {})
      .catch((e: Error): void => {
        Logger.error(e.message, e.stack, 'Sendmail');
      });
  }
}
