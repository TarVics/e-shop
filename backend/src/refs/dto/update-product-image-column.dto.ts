import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdateProductImageColumnDto {
  /**
   * Product column image
   */
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  readonly imageColumn: string;
}
