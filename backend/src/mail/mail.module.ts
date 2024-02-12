import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MailService } from './mail.service';
import { MailConfig, mailOptions } from './mail.options';

@Module({
  imports: [
    ConfigModule.forFeature(MailConfig),
    MailerModule.forRootAsync(mailOptions),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
