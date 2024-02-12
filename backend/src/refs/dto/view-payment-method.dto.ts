import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { PaymentMethod } from '../enums';

/**
 * Payment Method view information
 */
export class ViewPaymentMethodDto {
  /**
   * Primary key
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  /**
   * User payment method
   */
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  /**
   * Payment method name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  /**
   * Payment method short information
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly info: string;
}
