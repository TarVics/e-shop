import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ViewCartItemDto } from './view-cart-item.dto';

/**
 * Cart information
 */

export class ViewCartDto {
  /**
   * Cart UID
   */
  @ApiProperty()
  readonly uid: string;

  /**
   * Cart total price
   */
  @ApiProperty()
  readonly total: number;

  /**
   * Cart items
   * @example []
   */
  @ApiProperty({ type: () => ViewCartItemDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => ViewCartItemDto)
  readonly items: ViewCartItemDto[];
}
