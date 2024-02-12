import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { PageMetaDto } from './page-meta.dto';

/**
 * Pagination result information
 */
export class PageDto<T> {
  /**
   * Pagination result data
   */
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  /**
   * Pagination result metadata
   */
  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
