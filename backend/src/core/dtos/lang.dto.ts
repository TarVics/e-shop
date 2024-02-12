import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { I18nLocale } from '../enums';

/**
 * Page references query options
 */
export class LangDto {
  /**
   * Language locale
   * @example uk-UA
   */
  @ApiPropertyOptional({ enum: I18nLocale, default: I18nLocale.en_US })
  @IsOptional()
  @IsEnum(I18nLocale)
  readonly lang: I18nLocale = I18nLocale.en_US;
}
