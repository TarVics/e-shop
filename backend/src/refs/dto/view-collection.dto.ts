import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { ViewCollectionBannerDto } from './view-collection-banner.dto';

/**
 * Color view information
 */
export class ViewCollectionDto {
  /**
   * Primary key
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  /**
   * Collection Name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  /**
   * Reference item description
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description: string;

  /**
   * Is hot collection mark
   */
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly isHot: boolean;

  /**
   * Collection banners
   * @example []
   */
  @ApiProperty({ type: () => ViewCollectionBannerDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => ViewCollectionBannerDto)
  readonly banners: ViewCollectionBannerDto[];
}
