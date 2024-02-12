import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

/**
 * Color view information
 */
export class ViewColorDto {
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
   * Color
   */
  @ApiProperty()
  @Column()
  readonly color: string;
}
