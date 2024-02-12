import { IsEnum, IsFQDN, IsString } from 'class-validator';

import { IsPortNumber } from '../core/validation';

export enum DatabaseKind {
  mysql = 'mysql',
  postgres = 'postgres',
  cockroachdb = 'cockroachdb',
  sap = 'sap',
  mariadb = 'mariadb',
  sqlite = 'sqlite',
  cordova = 'cordova',
  reactNative = 'react-native',
  nativescript = 'nativescript',
  sqljs = 'sqljs',
  oracle = 'oracle',
  mssql = 'mssql',
  mongodb = 'mongodb',
  auroraMysql = 'aurora-mysql',
  auroraPostgres = 'aurora-postgres',
  expo = 'expo',
  betterSqlite3 = 'better-sqlite3',
  capacitor = 'capacitor',
  spanner = 'spanner',
}

export class DatabaseVariables {
  @IsEnum(DatabaseKind)
  DB_KIND: string = DatabaseKind.mysql;
  @IsFQDN({ allow_numeric_tld: true, require_tld: false })
  DB_HOST: string;
  @IsPortNumber()
  DB_PORT: number;
  @IsString()
  DB_NAME: string;
  @IsString()
  DB_USER: string;
  @IsString()
  DB_PASS: string;
}
