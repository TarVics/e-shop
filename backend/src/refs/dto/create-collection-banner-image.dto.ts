import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { BannerKind } from '../enums';

/**
 * Create collection banner reference information
 */
export class CreateCollectionBannerImageDto {
  /**
   * Banner image
   */
  @ApiProperty({ type: 'string', format: 'binary' })
  readonly banner: Express.Multer.File;

  /**
   * Banner image kind
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(BannerKind)
  readonly kind: BannerKind;
}
