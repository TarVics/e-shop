import {
  ApiHideProperty,
  ApiProperty,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthRole } from '../enums';

/**
 * Update User
 */
class UpdateUser extends OmitType(CreateUserDto, [
  'email',
  'password',
  'role',
  'active',
] as const) {
  /**
   * User password
   * @example Password1!
   */
  @ApiHideProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  /**
   * User role
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AuthRole)
  readonly role: AuthRole = AuthRole.User;

  /**
   * User activity status
   */
  @ApiProperty()
  @IsBoolean()
  readonly active: boolean = false;
}

export class UpdateUserDto extends PartialType(UpdateUser) {}
