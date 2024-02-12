import { ApiProperty } from '@nestjs/swagger';
import {
  IsHexColor,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { CreateRefDto } from './create-ref.dto';

/**
 * Create color reference information
 */
export class CreateColorDto extends CreateRefDto {
  /**
   * Hex color value
   * @example #FFF888
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(9)
  @IsHexColor()
  readonly color: string;
}
