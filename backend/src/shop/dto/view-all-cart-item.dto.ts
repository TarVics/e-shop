import { ApiProperty } from '@nestjs/swagger';

import { ViewAllProductDto } from './view-all-product.dto';

/**
 * Cart item information
 */
export class ViewAllCartItemDto {
  /**
   * Product price including the current date discount
   */
  @ApiProperty()
  readonly price: string;

  /**
   * Product quantity
   */
  @ApiProperty()
  readonly quantity: number;

  /**
   * Product reference
   */
  @ApiProperty()
  readonly product: ViewAllProductDto;
}
