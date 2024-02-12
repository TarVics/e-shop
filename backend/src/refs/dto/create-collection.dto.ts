import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

import { CreateRefDto } from './create-ref.dto';

/**
 * Create collection reference information
 */
export class CreateCollectionDto extends CreateRefDto {
  /**
   * Reference item description (uk-UA)
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly description_uk?: string;

  /**
   * Reference item description (en-US)
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly description_en?: string;

  /**
   * Is hot collection mark
   */
  @ApiProperty()
  @IsBoolean()
  readonly isHot: boolean = false;
}
