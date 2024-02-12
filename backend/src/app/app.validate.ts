import { IsBoolean, IsEnum, IsFQDN, IsString } from 'class-validator';

import { IsUrlOrWildcard, IsPortNumber, IsMsTime } from '../core/validation';
import { LogLevel } from '../core/utils';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Debug = 'debug',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsFQDN({ allow_numeric_tld: true })
  BACKEND_HOST: string;
  @IsPortNumber()
  BACKEND_PORT: number;
  @IsString()
  BACKEND_NAME: string;
  @IsString()
  BACKEND_GREETING: string;
  @IsString()
  BACKEND_WELCOME: string;
  @IsString()
  BACKEND_COMPANY: string;
  @IsMsTime()
  BACKEND_REFS_TTL: string;

  @IsUrlOrWildcard({ require_tld: false })
  CORS_ORIGIN: string;
  @IsBoolean()
  CORS_CREDENTIALS: boolean;

  @IsString()
  LOG_PATH: string;
  @IsEnum(LogLevel)
  LOG_LEVEL: LogLevel = LogLevel.error;
}
