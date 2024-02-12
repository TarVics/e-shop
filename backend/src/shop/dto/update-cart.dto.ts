import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends CreateCartDto {
  /**
   * Cart UID
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9A-F]{32}$/i)
  uid: string;
}
