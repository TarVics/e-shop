import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { AppConfig } from './app.options';

@Controller()
export class AppController {
  constructor(
    @Inject(AppConfig.KEY)
    private readonly app: ConfigType<typeof AppConfig>,
  ) {}

  @Get()
  info(): string {
    return `Welcome to ${this.app.greeting}!`;
  }
}
