import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

/**
 * Category view information
 */
export class ViewCategoryDto {
  /**
   * Primary key
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  /**
   * Name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  /**
   * Parent category reference
   */
  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly parentId: number;

  /**
   * Collection reference
   */
  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly collectionId: number;

  /**
   * Banner image
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly bannerImage: string;

  /**
   * Banner description
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly bannerName: string;

  /**
   * Child subcategories
   * @example []
   */
  @ApiProperty({ type: () => ViewCategoryDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => ViewCategoryDto)
  readonly children: ViewCategoryDto[];
}
