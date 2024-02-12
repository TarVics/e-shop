import { ApiProperty } from '@nestjs/swagger';

import { ViewAllCartItemDto } from './view-all-cart-item.dto';

/**
 * Cart information
 */

export class ViewAllCartDto {
  /**
   * Cart UID
   */
  @ApiProperty()
  readonly uid: string;

  /**
   * Cart total price
   */
  @ApiProperty()
  readonly total: string;

  /**
   * Cart items
   */
  @ApiProperty()
  readonly items: ViewAllCartItemDto[];
}
