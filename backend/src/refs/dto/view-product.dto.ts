import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ViewProductImageDto } from './view-product-image.dto';
import { ViewProductQuickDto } from "./view-product-quick.dto";

/**
 * Product view information
 */
export class ViewProductDto {
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

  /**
   * Product category reference
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly categoryId: number;

  /**
   * Product model reference
   */
  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly modelId: number;

  /**
   * Product collection reference
   */
  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly collectionId: number;

  /**
   * Product collection reference
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly brandId: number;

  /**
   * Product gender reference
   */
  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly genderId: number;

  /**
   * Product price
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 4 })
  @IsPositive()
  readonly price: number;

  /**
   * Product sale
   */
  @ApiProperty()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.0)
  @Max(99.0)
  readonly sale: number;

  /**
   * Product sale stop date
   */
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  readonly saleStop: Date;

  /**
   * Product rating
   */
  @ApiProperty()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(10)
  readonly rating: number;

  /**
   * Product new status
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly isNew: boolean;

  /**
   * Product brief information
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly brief: string;

  /**
   * Product description
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  /**
   * Product details
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly details: string;

  /**
   * Product column image
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly imageColumn: string;

  /**
   * Product images
   */
  @ApiProperty({ type: () => ViewProductImageDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => ViewProductImageDto)
  readonly images: ViewProductImageDto[];

  /**
   * Products by model
   */
  // @ApiProperty({ type: () => ViewProductQuickDto, isArray: true })
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => ViewProductQuickDto)
  // readonly byModel?: ViewProductQuickDto[];

}
