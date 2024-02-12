import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * User password recovery request information
 */
export class RecoverRequestDto {
  /**
   * User email
   * @example admin@bestmail.net
   */
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(128)
  // @Transform(({ value }) => value.toLowerCase())
  readonly email: string;
}
