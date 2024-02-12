// nest-like-console-format.function.ts
// ----eslint-disable-next-line import/no-extraneous-dependencies
import clc from 'chalk';

import { format } from 'winston';
// ----eslint-disable-next-line import/no-extraneous-dependencies
import { Format as LogFormat } from 'logform';
import { inspect } from 'util';
import { NestLikeConsoleFormatOptions } from 'nest-winston/dist/winston.interfaces';
import process from 'process';

const nestLikeColorScheme: Record<string, clc.Chalk> = {
  info: clc.green,
  error: clc.red,
  warn: clc.yellow,
  debug: clc.magentaBright,
  verbose: clc.cyanBright,
};

/**
 * NestLikeConsoleFormat
 * {@link https://github.com/gremo/nest-winston/blob/master/winston.utilities.ts}
 * @param appName AppName
 * @param options Options
 */
export default function nestLikeConsoleFormat(
  appName = 'NestWinston',
  options?: NestLikeConsoleFormatOptions,
): LogFormat {
  return format.printf(
    ({ context, level, timestamp, message, ms, ...meta }) => {
      if (typeof timestamp !== 'undefined')
        // Only format the timestamp to a locale representation if it's ISO 8601 format. Any format
        // That is not a valid date string will throw, just ignore it (it will be printed as-is).
        try {
          if (timestamp === new Date(timestamp).toISOString())
            // eslint-disable-next-line no-param-reassign
            timestamp = new Date(timestamp).toLocaleString();
        } catch (error) {
          // eslint-disable-next-line no-empty
        }

      // const logLevel = level.charAt(0) === '\x1B' ? level.slice(5, -5) : level.slice(0);
      // const color = nestLikeColorScheme[logLevel] || ((text: string): string => text)
      // const logMessage = message.charAt(0) === '\t' ? message.slice(1) : message.slice(0);
      const color =
        nestLikeColorScheme[level] || ((text: string): string => text);

      const stringifiedMeta = JSON.stringify(meta);
      const formattedMeta = options?.prettyPrint
        ? inspect(JSON.parse(stringifiedMeta), { colors: true, depth: null })
        : stringifiedMeta;

      return (
        `${color(`[${appName}] ${String(process.pid).padEnd(5)} -`)} ` + // eslint-disable-line prefer-template
        (typeof timestamp !== 'undefined' ? `${timestamp} ` : '') + // eslint-disable-line prefer-template
        // + `\t${clc.yellow(level.charAt(0).toUpperCase() + level.slice(1))} ` // eslint-disable-line prefer-template
        `\t${color(level.toUpperCase())} ` + // eslint-disable-line prefer-template
        (typeof context !== 'undefined' // eslint-disable-line prefer-template
          ? `${clc.yellow('[' + context + ']')} ` // eslint-disable-line prefer-template
          : '') + // eslint-disable-line prefer-template
        `${color(message)}` + // eslint-disable-line prefer-template
        (formattedMeta && formattedMeta !== '{}' ? ` - ${formattedMeta}` : '') + // eslint-disable-line prefer-template
        (typeof ms !== 'undefined' ? ` ${clc.yellow(ms)}` : '') // eslint-disable-line prefer-template
      );
    },
  );
}
