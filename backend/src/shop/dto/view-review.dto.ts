import { ApiProperty } from '@nestjs/swagger';

export class ViewReviewDto {
  /**
   * Review UID
   */
  @ApiProperty()
  readonly uid: string;

  /**
   * Product reference
   */
  @ApiProperty()
  readonly product: string;

  /**
   * User name
   */
  @ApiProperty()
  readonly author: string;

  /**
   * User email
   */
  @ApiProperty()
  readonly email: string;

  /**
   * Product review contents
   */
  @ApiProperty()
  readonly text: string;

  /**
   * Product rating
   */
  @ApiProperty()
  readonly rating: number;

  /**
   * Create date
   */
  @ApiProperty()
  readonly createdAt: Date;
}
