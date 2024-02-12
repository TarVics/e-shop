import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  /**
   * Product reference
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9A-F]{32}$/i)
  readonly product: string;

  /**
   * Product review contents
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  /**
   * Product rating
   */
  @ApiProperty()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(10)
  readonly rating: number = 5;
}
