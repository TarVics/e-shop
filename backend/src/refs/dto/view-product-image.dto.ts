import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

/**
 * Product image information
 */
export class ViewProductImageDto {
  /**
   * Product main image
   */
  @ApiProperty()
  @IsString()
  readonly imageMain: string;

  /**
   * Product thumb image
   */
  @ApiProperty()
  @IsString()
  readonly imageThumb: string;
}
