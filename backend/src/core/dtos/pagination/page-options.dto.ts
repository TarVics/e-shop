import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

import { OrderEnum } from '../../enums';

/**
 * Page query options
 */
export class PageOptionsDto {
  /**
   * Sort order
   * @example ASC
   */
  @ApiPropertyOptional({ enum: OrderEnum, default: OrderEnum.ASC })
  @IsEnum(OrderEnum)
  @IsOptional()
  readonly order?: OrderEnum = OrderEnum.ASC;

  /**
   * Page number
   */
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  /**
   * Page size
   */
  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  constructor(options?: { order: OrderEnum; page: number; take: number }) {
    console.log(this);
    if (options?.order) this.order = options.order;
    if (options?.page) this.page = options.page;
    if (options?.take) this.take = options.take;
  }
}
