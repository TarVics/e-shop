import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * User authentication information
 */
export class LoginUserDto {
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

  /**
   * User password
   * @example Password1!
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly password: string;
}
