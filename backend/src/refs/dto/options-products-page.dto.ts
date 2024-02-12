import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { PageTakeEnum, SortKindEnum, SortOrderEnum } from '../enums';
import { LangDto } from '../../core/dtos';

/**
 * Products page query options
 */
export class OptionsProductsPageDto extends LangDto {
  // /**
  //  * Output currency
  //  */
  // @ApiPropertyOptional()
  // @IsOptional()
  // @Type(() => Number)
  // @IsInt()
  // @Min(1)
  // readonly currency?: number;

  /**
   * Page size
   */
  @ApiPropertyOptional({ enum: PageTakeEnum, default: PageTakeEnum.limit10 })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(PageTakeEnum)
  readonly take?: PageTakeEnum = PageTakeEnum.limit10;

  get skip(): number {
    return ((this.page || 1) - 1) * Number(this.take);
  }

  /**
   * Page number
   */
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page?: number = 1;

  /**
   * Sort kind
   */
  @ApiPropertyOptional({ enum: SortKindEnum, default: SortKindEnum.POSITION })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(SortKindEnum)
  readonly sort?: SortKindEnum = SortKindEnum.POSITION;

  /**
   * Sort order
   */
  @ApiPropertyOptional({ enum: SortOrderEnum, default: SortOrderEnum.ASC })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(SortOrderEnum)
  readonly order?: SortOrderEnum = SortOrderEnum.ASC;

  /**
   * Wide output
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly wide?: boolean;

  /**
   * Select products with discount
   */
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  readonly sale?: boolean;

  /**
   * Search query
   */
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => String)
  @IsString()
  readonly query?: string;

  /**
   * Search category
   */
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly category?: number;

  /**
   * Search collection
   */
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly collection?: number;

  /**
   * Search colors
   */
  @ApiPropertyOptional({ type: () => Number, isArray: true })
  @IsOptional()
  @Transform((params) => params.value.split(',').map(Number))
  @IsInt({ each: true })
  readonly colors?: number[];

  /**
   * Search sizes
   */
  @ApiPropertyOptional({ type: () => Number, isArray: true })
  @IsOptional()
  @Transform((params) => params.value.split(',').map(Number))
  @IsInt({ each: true })
  readonly sizes?: number[];

  /**
   * Search brands
   */
  @ApiPropertyOptional({ type: () => Number, isArray: true })
  @IsOptional()
  @Transform((params) => params.value.split(',').map(Number))
  @IsInt({ each: true })
  readonly brands?: number[];

  /**
   * Price is greater than or equal to
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 4 })
  readonly min?: number;

  /**
   * Price is less than or equal to
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 4 })
  readonly max?: number;

  /**
   * Search genders
   */
  @ApiPropertyOptional({ type: () => Number, isArray: true })
  @IsOptional()
  @Transform((params) => params.value.split(',').map(Number))
  @IsInt({ each: true })
  readonly genders?: number[];
}
