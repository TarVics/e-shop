import { ApiProperty } from '@nestjs/swagger';

import {
  ViewCategoryDto,
  ViewCollectionDto,
  ViewColorDto,
  ViewRefDto,
} from '../../refs/dto';

/**
 * Product view information
 */
export class ViewAllProductDto {
  /**
   * Item UID
   */
  @ApiProperty()
  readonly uid: string;

  /**
   * Product name
   */
  @ApiProperty()
  readonly name: string;

  /**
   * Product color reference
   */
  @ApiProperty()
  readonly color?: ViewColorDto;

  /**
   * Product size reference
   */
  @ApiProperty()
  readonly size?: ViewRefDto;

  /**
   * Product quantity
   */
  @ApiProperty()
  readonly quantity: number;

  /**
   * Product category reference
   */
  @ApiProperty()
  readonly category?: ViewCategoryDto;

  /**
   * Product model reference
   */
  @ApiProperty()
  readonly model?: ViewRefDto;

  /**
   * Product collection reference
   */
  @ApiProperty()
  readonly collection?: ViewCollectionDto;

  /**
   * Product collection reference
   */
  @ApiProperty()
  readonly brand?: ViewRefDto;

  /**
   * Product gender reference
   */
  @ApiProperty()
  readonly gender?: ViewRefDto;

  /**
   * Product price
   */
  @ApiProperty()
  readonly price: number;

  /**
   * Product sale
   */
  @ApiProperty()
  readonly sale: number;

  /**
   * Product sale stop date
   */
  @ApiProperty()
  readonly saleStop: Date;

  /**
   * Product rating
   */
  @ApiProperty()
  readonly rating: number;

  /**
   * Product new status
   */
  @ApiProperty()
  readonly isNew: boolean;

  /**
   * Product brief information
   */
  @ApiProperty()
  readonly brief: string;

  /**
   * Product description
   */
  @ApiProperty()
  readonly description: string;

  /**
   * Product details
   */
  @ApiProperty()
  readonly details: string;

  /**
   * Product column image
   */
  @ApiProperty()
  readonly imageColumn: string;
}
