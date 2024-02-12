import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

import { ShippingMethod } from '../enums';

/**
 * Create shipping method information
 */
export class CreateShippingMethodDto {
  /**
   * User shipping method
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ShippingMethod)
  readonly method: ShippingMethod;

  /**
   * User shipping price
   */
  @ApiProperty()
  @Min(0)
  @IsNotEmpty()
  readonly price: number;

  /**
   * Shipping method name (uk-UA)
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name_uk: string;

  /**
   * Shipping method name (en-US)
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name_en: string;

  /**
   * Shipping method short information (uk-UA)
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly info_uk: string;

  /**
   * Shipping method short information (en-US)
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly info_en: string;

  /**
   * Method is active
   */
  @ApiProperty()
  @IsNotEmpty()
  readonly active: boolean = false;
}
