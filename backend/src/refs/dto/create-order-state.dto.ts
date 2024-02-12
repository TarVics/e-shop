import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { CreateRefDto } from './create-ref.dto';
import { OrderStateEnum } from '../enums';

/**
 * Create Order State reference information
 */
export class CreateOrderStateDto extends CreateRefDto {
  /**
   * State code
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(OrderStateEnum)
  readonly code: OrderStateEnum;
}
