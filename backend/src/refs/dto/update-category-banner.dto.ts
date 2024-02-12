import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryBannerDto {
  /**
   * Banner image
   */
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(255)
  readonly bannerImage?: string;

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
