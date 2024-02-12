import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateRefDto } from './create-ref.dto';

/**
 * Create category reference information
 */
export class CreateCategoryDto extends CreateRefDto {
  /**
   * Parent category reference
   */
  @ApiProperty()
  @IsOptional()
  readonly parentId?: number;

  /**
   * Collection reference
   */
  @ApiProperty()
  @IsOptional()
  readonly collectionId?: number;
}
