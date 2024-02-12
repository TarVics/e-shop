import { ApiProperty } from '@nestjs/swagger';

import {
  ViewOrderStateDto,
  ViewPaymentMethodDto,
  ViewShippingMethodDto,
} from '../../refs/dto';

import { ViewAllCartDto } from './view-all-cart.dto';

export class ViewAllOrderDto {
  /**
   * Order Number
   */
  // @ApiProperty()
  // readonly id: string;

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
   * User address including zipCode, city and address fields
   */
  @ApiProperty()
  readonly addressFull: string;

  /**
   * Order Shipping Method reference
   */
  @ApiProperty()
  readonly shipping?: ViewShippingMethodDto;

  /**
   * Order Shipping Method price
   */
  @ApiProperty()
  shippingPrice: string;

  /**
   * Order Payment Method reference
   */
  @ApiProperty()
  readonly payment?: ViewPaymentMethodDto;

  /**
   * Order Cart
   */
  @ApiProperty()
  readonly cart: ViewAllCartDto;

  /**
   * Order State reference
   */
  @ApiProperty()
  readonly state?: ViewOrderStateDto;

  /**
   * Create Date
   */
  @ApiProperty()
  readonly createdAt: string;

  /**
   * Update Date
   */
  @ApiProperty()
  readonly updatedAt: string;
}
