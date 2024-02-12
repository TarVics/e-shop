// mail.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

import { validateObject } from '../core/utils';

import { MailService } from './mail.service';
import { MailConfig } from './mail.options';
import { MailModule } from './mail.module';
import { MailVariables } from './mail.validate';

export const options: ConfigModuleOptions = {
  envFilePath: resolve(cwd(), '.env.debug.local'),
  load: [MailConfig],
  validate: (config: Record<string, any>) =>
    validateObject(config, MailVariables),
};

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MailModule, ConfigModule.forRoot(options)],
      providers: [MailService],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
