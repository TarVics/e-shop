import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDtoParameters } from '../../interfaces';

/**
 * Result pagination metadata
 */
export class PageMetaDto {
  /**
   * Page number
   */
  @ApiProperty()
  readonly page: number;

  /**
   * Page size
   */
  @ApiProperty()
  readonly take: number;

  /**
   * Item count
   */
  @ApiProperty()
  readonly itemCount: number;

  /**
   * Page count
   */
  @ApiProperty()
  readonly pageCount: number;

  /**
   * Has previous page
   */
  @ApiProperty()
  readonly hasPrevious: boolean;

  /**
   * Has next page
   */
  @ApiProperty()
  readonly hasNext: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPrevious = this.page > 1;
    this.hasNext = this.page < this.pageCount;
  }
}
