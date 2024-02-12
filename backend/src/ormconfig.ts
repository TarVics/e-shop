import { DataSource, DataSourceOptions /*, FileLogger*/ } from 'typeorm';
import { resolve } from 'node:path';

import { loadEnvFile } from './core/utils';
import { connectionFactory } from './database/database.options';

const envFilePath = resolve(
  process.cwd(),
  process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}.local` : '.env',
);

const config = loadEnvFile(envFilePath, { expandVariables: true });
const options = connectionFactory(config) as DataSourceOptions;

// const logger = new FileLogger("all", { logPath: "logs/typeorm.log" });

export default new DataSource({
  ...options,

  logging: [/*"query",*/ 'schema', 'error', 'warn', 'info', 'log', 'migration'],
  logger: 'advanced-console',

  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,

  migrationsTableName: '_migrations',

  // migrations: ["dist/**/migrations/*{.ts,.js}"],
  // entities: ["dist/**/*.entity{.ts,.js}"]

  // migrations: ["dist/**/migrations/*.js"],
  // entities: ["dist/**/*.entity.js"]

  migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
});
