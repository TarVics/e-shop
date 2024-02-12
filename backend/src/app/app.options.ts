import { resolve } from 'node:path';
import { env, cwd } from 'node:process';

import { registerAs } from '@nestjs/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import { EnvironmentVariables } from './app.validate';
import { validateObject } from '../core/utils';

export const AppConfig = registerAs('app', () => ({
  NODE_ENV: env.NODE_ENV,
  port: parseInt(env.BACKEND_PORT || '5000', 10) || 5000,
  host: env.BACKEND_HOST || '0.0.0.0',
  name: env.BACKEND_NAME,
  company: env.BACKEND_COMPANY,
  greeting: env.BACKEND_GREETING,
  welcome: env.BACKEND_WELCOME,
  logPath: env.LOG_PATH || 'log',
  refsTTL: env.BACKEND_REFS_TTL || '15m',
}));

export const FrontendConfig = registerAs('frontend', () => ({
  url: env.FRONTEND_URL,
  recover_uri: env.FRONTEND_RECOVER_URI,
  register_uri: env.FRONTEND_REGISTER_URI,
}));

export const CorsConfig = registerAs('cors', () => ({
  origin: env.CORS_ORIGIN || '*',
  credentials: env.CORS_CREDENTIALS === 'true',
}));

export const LogConfig = registerAs('log', () => ({
  path: env.LOG_PATH || 'logs',
  level: env.LOG_LEVEL || 'error',
}));

export const appOptions: ConfigModuleOptions = {
  cache: true,
  envFilePath: resolve(
    cwd(),
    //env.NODE_ENV ? `.env.${env.NODE_ENV}.local` : '.env',
    `.env.${process.env.NODE_ENV || 'development'}.local`,
  ),
  expandVariables: true,
  isGlobal: true,
  load: [AppConfig, CorsConfig, LogConfig, FrontendConfig],
  validate: (config: Record<string, any>) =>
    validateObject(config, EnvironmentVariables),
  validationOptions: {
    allowUnknown: false,
    abortEarly: true,
  },
};
