import { IsEnum, IsString } from 'class-validator';
import { CronExpression } from '@nestjs/schedule';

import { IsMsTime } from '../core/validation';

export class AuthVariables {
  @IsString()
  JWT_ACCESS_SECRET: string;

  @IsMsTime()
  JWT_ACCESS_EXPIRE: string;

  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsMsTime()
  JWT_REFRESH_EXPIRE: string;

  @IsString()
  JWT_REGISTER_SECRET: string;

  @IsMsTime()
  JWT_REGISTER_EXPIRE: string;

  @IsString()
  JWT_RECOVER_SECRET: string;

  @IsMsTime()
  JWT_RECOVER_EXPIRE: string;

  @IsEnum(CronExpression)
  JWT_REMOVE_EXPIRE: string;
}
