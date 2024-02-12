import {
  ConfigModule,
  ConfigObject,
  ConfigType,
  registerAs,
} from '@nestjs/config';
import { DatabaseType } from 'typeorm';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

import { validateObject } from '../core/utils';
import { DatabaseVariables } from './database.validate';
import { SnakeNamingStrategy } from './strategies';

export function connectionFactory(config: ConfigObject): TypeOrmModuleOptions {
  validateObject(config, DatabaseVariables);

  return {
    type: config.DB_KIND as DatabaseType,
    host: config.DB_HOST,
    port: parseInt(config.DB_PORT, 10),
    database: config.DB_NAME,
    username: config.DB_USER,
    password: config.DB_PASS,
    logging: config.NODE_ENV === 'development',
    autoLoadEntities: true,
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
  };
}

export const DatabaseConfig = registerAs('database', () =>
  connectionFactory(process.env),
);

export const databaseOptions: TypeOrmModuleAsyncOptions = {
  name: 'default',
  imports: [ConfigModule.forFeature(DatabaseConfig)],
  inject: [DatabaseConfig.KEY],
  /*
  useFactory: (config: ConfigType<typeof DatabaseConfig>): TypeOrmModuleOptions => ({
    type: config.type as DatabaseType,
    type: "mysql",
    host: config.host,
    port: config.port,
    database: config.database,
    username: config.username,
    password: config.password,
    logging: config.logging,
    autoLoadEntities: true,
    synchronize: false,
  }),
*/
  /*
  useFactory: (config: ConfigObject) => connectionFactory(process.env),
*/
  useFactory: (config: ConfigType<typeof DatabaseConfig>) => config,
};
