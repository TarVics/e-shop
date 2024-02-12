import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

/**
 * Ref view information
 */
export class ViewRefDto {
  /**
   * Primary key
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  /**
   * Item Name
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
