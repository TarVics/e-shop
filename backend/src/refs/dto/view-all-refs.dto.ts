import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { ViewProductsSummaryDto } from './view-products-summary.dto';
import { ViewCategoryDto } from './view-category.dto';
import { ViewCollectionDto } from './view-collection.dto';
import { ViewColorDto } from './view-color.dto';
import { ViewCurrencyDto } from './view-currency.dto';
import { ViewPaymentMethodDto } from './view-payment-method.dto';
import { ViewShippingMethodDto } from './view-shipping-method.dto';
import { ViewRefDto } from './view-ref.dto';
import { ViewOrderStateDto } from './view-order-state.dto';

/**
 * All references
 */
export class ViewAllRefsDto {
  /**
   * Brand information
   */
  @ApiProperty({ type: ViewRefDto, isArray: true })
  readonly brands: ViewRefDto[];

  /**
   * Category information
   */
  @ApiProperty({
    // type: CategoryViewEntity,
    isArray: true,
    allOf: [
      { $ref: getSchemaPath(ViewCategoryDto) },
      {
        properties: {
          children: {
            type: 'array',
            items: { $ref: getSchemaPath(ViewCategoryDto) },
          },
        },
      },
    ],
  })
  readonly categories: ViewCategoryDto[];

  /**
   * Collection information
   */
  @ApiProperty({ type: ViewCollectionDto, isArray: true })
  readonly collections: ViewCollectionDto[];

  /**
   * Color information
   */
  @ApiProperty({ type: ViewColorDto, isArray: true })
  readonly colors: ViewColorDto[];

  /**
   * Currency information
   */
  @ApiProperty({ type: ViewCurrencyDto, isArray: true })
  readonly currencies: ViewCurrencyDto[];

  /**
   * Gender information
   */
  @ApiProperty({ type: ViewRefDto, isArray: true })
  readonly genders: ViewRefDto[];

  /**
   * Model information
   */
  @ApiProperty({ type: ViewRefDto, isArray: true })
  readonly models: ViewRefDto[];

  /**
   * Order States information
   */
  @ApiProperty({ type: ViewOrderStateDto, isArray: true })
  readonly orderStates: ViewOrderStateDto[];

  /**
   * Payment methods information
   */
  @ApiProperty({ type: ViewPaymentMethodDto, isArray: true })
  readonly paymentMethods: ViewPaymentMethodDto[];

  /**
   * Shipping methods information
   */
  @ApiProperty({ type: ViewShippingMethodDto, isArray: true })
  readonly shippingMethods: ViewShippingMethodDto[];

  /**
   * Size information
   */
  @ApiProperty({ type: ViewRefDto, isArray: true })
  readonly sizes: ViewRefDto[];

  /**
   * Products Summary information
   */
  @ApiProperty({ type: ViewProductsSummaryDto })
  readonly summary: ViewProductsSummaryDto;
}
