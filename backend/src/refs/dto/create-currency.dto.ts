import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, Matches, MaxLength } from 'class-validator';

/**
 * Create currency reference information
 */
export class CreateCurrencyDto {
  /**
   * Currency name
   * @example UAH
   */
  @ApiProperty()
  @MaxLength(3)
  @Matches(/^[A-Z]{3}$/, { message: 'Invalid currency name' })
  readonly name: string;

  /**
   * Currency sign
   * @example $
   */
  @ApiProperty()
  @MaxLength(1)
  readonly sign: string;

  /**
   * Tail currency description (uk-UA)
   */
  @ApiProperty()
  @IsOptional()
  @MaxLength(3)
  readonly tail_uk?: string;

  /**
   * Tail currency description (en-US)
   */
  @ApiProperty()
  @IsOptional()
  @MaxLength(3)
  readonly tail_en?: string;

  /**
   * Currency exchange rate
   * @example 1.35
   */
  @ApiProperty()
  @IsPositive()
  readonly rate: number;
}
