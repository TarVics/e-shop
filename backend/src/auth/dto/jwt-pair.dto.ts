import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * JWT Keys pair
 */
export class JwtPairDto {
  /**
   * access JWT key
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string;

  /**
   * refresh JWT key
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string;
}
