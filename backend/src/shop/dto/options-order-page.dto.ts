import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

import { PageTakeEnum, SortOrderEnum } from '../../refs/enums';
import { LangDto } from '../../core/dtos';

/**
 * Orders page query options
 */
export class OptionsOrderPageDto extends LangDto {
  /**
   * Page size
   */
  @ApiPropertyOptional({ enum: PageTakeEnum, default: PageTakeEnum.limit10 })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(PageTakeEnum)
  readonly take: PageTakeEnum = PageTakeEnum.limit10;

  get skip(): number {
    return (this.page - 1) * Number(this.take);
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
  readonly page: number = 1;

  /**
   * Sort order
   */
  @ApiPropertyOptional({ enum: SortOrderEnum, default: SortOrderEnum.ASC })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(SortOrderEnum)
  readonly order: SortOrderEnum = SortOrderEnum.ASC;
}
