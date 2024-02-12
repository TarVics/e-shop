import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryImageDto {
  /**
   * Banner image
   */
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  readonly bannerImage?: Express.Multer.File;

  /**
   * Banner description (uk-UA)
   */
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(255)
  readonly bannerName_uk?: string;

  /**
   * Banner description (en-US)
   */
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(255)
  readonly bannerName_en?: string;
}
