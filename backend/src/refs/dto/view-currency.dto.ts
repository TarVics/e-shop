import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

/**
 * Currency view information
 */
export class ViewCurrencyDto {
  /**
   * Primary key
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  /**
   * Currency name
   * @example UAH
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  readonly name: string;

  /**
   * Currency sign
   * @example $
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 1)
  readonly sign: string;

  /**
   * Tail currency description
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(3, 3)
  readonly tail: string;

  /**
   * Currency exchange rate
   * @example 1.35
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 4 })
  readonly rate: number;
}
