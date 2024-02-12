import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProductImageDto {
  /**
   * Product reference
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly productId: number;

  /**
   * Product main image
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly imageMain: string;

  /**
   * Product thumb image
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly imageThumb: string;
}
