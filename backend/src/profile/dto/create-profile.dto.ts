import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber, Matches,
  MaxLength
} from "class-validator";

export class CreateProfileDto {
  /**
   * User email
   */
  @ApiProperty()
  @IsOptional()
  readonly email: string;

  /**
   * User first name
   */
  @ApiProperty()
  @IsOptional()
  readonly firstName: string;

  /**
   * User last name
   */
  @ApiProperty()
  @IsOptional()
  readonly lastName: string;

  /**
   * User address
   */
  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  readonly address: string;

  /**
   * User city
   */
  @ApiProperty()
  @IsOptional()
  @MaxLength(32)
  readonly city: string;

  /**
   * User zip code
   */
  @ApiProperty()
  @IsOptional()
  @Matches(/^[0-9]{5,6}$/, {
    message: 'zip code format error',
  })
  @MaxLength(16)
  readonly zipCode: string;

  /**
   * User phone number
   */
  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  @MaxLength(32)
  readonly tel: string;

  /**
   * User country name
   */
  @ApiProperty()
  @IsOptional()
  @MaxLength(32)
  readonly country: string;

  /**
   * User payment method
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly paymentMethodId: number;

  /**
   * User shipping method
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly shippingMethodId: number;
}
