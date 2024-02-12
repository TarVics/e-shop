import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { BannerKind } from '../enums';

/**
 * Collection banners information
 */
export class ViewCollectionBannerDto {
  /**
   * Banner image
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly banner: string;

  /**
   * Banner image kind
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(BannerKind)
  readonly kind: BannerKind;
}
