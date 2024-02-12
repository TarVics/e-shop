import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

import { LangDto } from '../../core/dtos';

/**
 * Page references query options
 */
export class OptionsRefDto extends LangDto {
  /**
   * Currency ID
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  readonly curr?: number = 1;
}
