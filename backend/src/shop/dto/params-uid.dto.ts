import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * UID param type
 */
export class ParamsUidDto {
  /**
   * UID param
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9A-F]{32}$/i)
  readonly uid: string;
}
