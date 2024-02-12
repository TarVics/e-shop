import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateProfileDto extends PartialType(
  OmitType(CreateProfileDto, ['paymentMethodId', 'shippingMethodId'] as const),
) {
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
