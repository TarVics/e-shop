import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { Type } from 'class-transformer';
import { BannerKind } from '../enums';

/**
 * Create collection banner reference information
 */
export class CreateCollectionBannerDto {
  /**
   * Collection reference
   */
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly collectionId: number;

  /**
   * Banner image
   */
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
