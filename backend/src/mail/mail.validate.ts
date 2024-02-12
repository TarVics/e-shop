import { IsEmail, IsOptional, IsString } from 'class-validator';

import { IsPortNumber } from '../core/validation';

export class MailVariables {
  @IsOptional()
  MAIL_SERV: string;

  @IsOptional()
  MAIL_HOST: string;

  @IsOptional()
  @IsPortNumber()
  MAIL_PORT: number;

  @IsString()
  MAIL_USER: string;

  @IsString()
  MAIL_PASS: string;

  @IsEmail()
  MAIL_FROM: string;
}
