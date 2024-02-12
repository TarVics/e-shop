import { ApiProperty } from '@nestjs/swagger';

import { ViewCartDto } from './view-cart.dto';

export class ViewOrderDto {
  // /**
  //  * Order Number
  //  */
  // @ApiProperty()
  // readonly id: number;

  /**
   * Order UID
   */
  @ApiProperty()
  readonly uid: string;

  /**
   * User zip code
   */
  @ApiProperty()
  readonly zipCode: string;

  /**
   * User country name
   */
  @ApiProperty()
  readonly country: string;

  /**
   * User city name
   */
  @ApiProperty()
  readonly city: string;

  /**
   * User address
   */
  @ApiProperty()
  readonly address: string;

  /**
   * Order Shipping Method reference
   */
  @ApiProperty()
  readonly shippingId: number;

  /**
   * Order Payment Method reference
   */
  @ApiProperty()
  readonly paymentId: number;

  /**
   * Order Cart
   */
  @ApiProperty()
  readonly cart: ViewCartDto;

  /**
   * Order State reference
   */
  @ApiProperty()
  readonly stateId: number;

  /**
   * Create Date
   */
  @ApiProperty()
  readonly createdAt: Date;

  /**
   * Update Date
   */
  @ApiProperty()
  readonly updatedAt: Date;
}
