import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { PaymentMethod } from '../enums';

/**
 * Create payment method information
 */
export class CreatePaymentMethodDto {
  /**
   * User payment method
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  readonly method: PaymentMethod;

  /**
   * Payment method name (uk-UA)
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name_uk: string;

  /**
   * Payment method name (en-US)
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name_en: string;

  /**
   * Payment method short information (uk-UA)
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly info_uk: string;

  /**
   * Payment method short information (en-US)
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
