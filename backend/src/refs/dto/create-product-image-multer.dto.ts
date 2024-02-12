import { ApiProperty } from '@nestjs/swagger';

export class CreateProductImageMulterDto {
  /**
   * Product main image
   */
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  readonly imageMain: Express.Multer.File[];

  /**
   * Product thumb image
   */
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  readonly imageThumb: Express.Multer.File[];
}
