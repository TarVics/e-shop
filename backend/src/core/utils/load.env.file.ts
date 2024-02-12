import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function loadEnvFile(
  envFilePath: string,
  options?: {
    ignoreEnvVars?: boolean;
    expandVariables?: boolean;
  },
): Record<string, any> {
  let config: ReturnType<typeof dotenv.parse> = {};

  if (existsSync(envFilePath || resolve(process.cwd(), '.env'))) {
    config = Object.assign(dotenv.parse(readFileSync(envFilePath)), config);

    if (options?.expandVariables) {
      config = expand({ parsed: config }).parsed || config;
    }
  }

  if (!options?.ignoreEnvVars) {
    const envData: ReturnType<typeof dotenv.parse> = {};
    Object.entries(process.env).forEach(([key, value]) => {
      if (value) envData[key] = value;
    });

    config = { ...config, ...envData };
  }

  return config;
}
