import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { OrderStateEnum } from '../enums';

/**
 * Order State view information
 */
export class ViewOrderStateDto {
  /**
   * Primary key
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  /**
   * Name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  /**
   * State Code
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(OrderStateEnum)
  readonly code: OrderStateEnum;
}
