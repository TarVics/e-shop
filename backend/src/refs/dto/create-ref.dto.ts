import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Create reference information
 */
export class CreateRefDto {
  /**
   * Reference item name (uk-UA)
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name_uk: string;

  /**
   * Reference item name (en-US)
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name_en: string;
}
