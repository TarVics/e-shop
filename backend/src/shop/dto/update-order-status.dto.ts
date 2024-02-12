import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateOrderStatusDto {
  /**
   * Order State reference
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly stateId: number;
}
