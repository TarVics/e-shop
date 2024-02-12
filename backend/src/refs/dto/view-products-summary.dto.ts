import { ApiProperty } from '@nestjs/swagger';
import { ViewProductDto } from './view-product.dto';

export class ViewProductsSummaryDto {
  /**
   * Home Collection Large banners
   */
  @ApiProperty({ isArray: true, type: () => Number })
  readonly homeCollectionLarge: Array<number>;

  /**
   * Home Collection Normal banners
   */
  @ApiProperty({ isArray: true, type: () => Number })
  readonly homeCollectionNormal: Array<number>;

  /**
   * Deal Collection Column banner
   */
  @ApiProperty({ type: () => Number })
  readonly dealsCollectionColumn: Array<number>;

  /**
   * Deals products
   */
  @ApiProperty({ isArray: true, type: () => ViewProductDto })
  readonly dealsProducts: Array<ViewProductDto>;

  /**
   * Hot Collection Large
   */
  @ApiProperty({ type: () => Number })
  readonly hotCollectionLarge: Array<number>;

  /**
   * Hot Collection Normal
   */
  @ApiProperty({ isArray: true, type: () => Number })
  readonly hotCollectionNormal: Array<number>;

  /**
   * Latest Collection Column
   */
  @ApiProperty({ type: () => Number })
  readonly latestCollectionColumn: Array<number>;

  /**
   * Latest Products
   */
  @ApiProperty({ isArray: true, type: () => ViewProductDto })
  readonly latestProducts: Array<ViewProductDto>;

  /**
   * Picked Products
   */
  @ApiProperty({ isArray: true, type: () => ViewProductDto })
  readonly picked: Array<ViewProductDto>;
}
