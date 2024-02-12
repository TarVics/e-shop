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
} from 'class-validator';

export class CreateProductDto {
  /**
   * Product name (uk-UA)
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name_uk: string;

  /**
   * Product name (en-US)
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name_en: string;

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
  readonly isNew: boolean = true;

  /**
   * Product brief information (uk-UA)
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly brief_uk: string;

  /**
   * Product brief information (en-US)
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly brief_en: string;

  /**
   * Product description (uk-UA)
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description_uk: string;

  /**
   * Product description (en-US)
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description_en: string;

  /**
   * Product details (uk-UA)
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly details_uk: string;

  /**
   * Product details (en-US)
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly details_en: string;
}
