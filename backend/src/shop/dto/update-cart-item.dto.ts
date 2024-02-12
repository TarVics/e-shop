import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Matches, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCartItemDto {
  /**
   * Product reference
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9A-F]{32}$/i)
  product: string;

  /**
   * Product quantity
   */
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  quantity: number;
}
