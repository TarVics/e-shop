import {
  Allow,
  IsBoolean,
  IsEmail, IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from "class-validator";
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { AuthRole } from '../enums';

/**
 * Creating a user
 */
export class CreateUserDto {
  /**
   * User first name
   * @example John
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly firstName?: string;

  /**
   * User last name
   * @example Doe
   */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly lastName?: string;

  /**
   * User email
   * @example admin@bestmail.net
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(128)
  // @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  /**
   * User password
   * @example Password1!
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  /**
   * User role
   */
  @ApiHideProperty()
  @IsNotEmpty()
  @IsEnum(AuthRole)
  readonly role: AuthRole = AuthRole.User;

  /**
   * JWT key to update the access token
   */
  @ApiHideProperty()
  @Allow()
  readonly refreshToken: string | null;

  /**
   * User activity status
   */
  @ApiHideProperty()
  @IsBoolean()
  readonly active: boolean = false;
}
