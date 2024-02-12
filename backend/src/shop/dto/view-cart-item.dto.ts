import { ApiProperty } from '@nestjs/swagger';
import { ViewProductDto } from '../../refs/dto';

/**
 * Cart item information
 */
export class ViewCartItemDto {
  /**
   * Product price including the current date discount
   */
  @ApiProperty()
  readonly price: number;

  /**
   * Product quantity
   */
  @ApiProperty()
  readonly quantity: number;

  /**
   * Product reference
   */
  @ApiProperty()
  readonly product: ViewProductDto;
}
