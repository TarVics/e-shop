import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { ShippingMethod } from '../enums';

/**
 * Shipping Method view information
 */
export class ViewShippingMethodDto {
  /**
   * Primary key
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  /**
   * User shipping method
   */
  @IsNotEmpty()
  @IsEnum(ShippingMethod)
  method: ShippingMethod;

  /**
   * User shipping price
   */
  @ApiProperty()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 4 })
  readonly price: number;

  /**
   * Shipping method name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  /**
   * Shipping method short information
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly info: string;
}
