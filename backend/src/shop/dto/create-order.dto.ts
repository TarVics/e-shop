import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  /**
   * User zip code
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{5}(?:-[0-9]{4})?$/)
  readonly zipCode: string;

  /**
   * User country name
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly country: string;

  /**
   * User city name
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly city: string;

  /**
   * User address
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly address: string;

  /**
   * Order Shipping Method reference
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly shippingId: number;

  /**
   * Order Payment Method reference
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly paymentId: number;

  /**
   * Order Cart reference
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9A-F]{32}$/i)
  readonly cart: string;
}
