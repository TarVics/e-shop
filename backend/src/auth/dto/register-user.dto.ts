import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * User authentication information
 */
export class RegisterUserDto {
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
  @ApiProperty({ minLength: 4, maxLength: 20 })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;
}
