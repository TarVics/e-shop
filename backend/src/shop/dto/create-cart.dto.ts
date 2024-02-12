import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { UpdateCartItemDto } from './update-cart-item.dto';

export class CreateCartDto {
  /**
   * Cart items
   */
  @ApiProperty({ type: UpdateCartItemDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCartItemDto)
  items: UpdateCartItemDto[];
}
