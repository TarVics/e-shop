import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

/**
 * Product view information
 */
export class ViewProductQuickDto {

  /**
   * Item UID
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  readonly uid: string;

  /**
   * Product name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name: string;

  /**
   * Product color reference
   */
  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly colorId: number;

  /**
   * Product size reference
   */
  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly sizeId: number;

  /**
   * Product quantity
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly quantity: number;
}
