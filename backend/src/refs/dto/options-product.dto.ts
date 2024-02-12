import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from "class-validator";

import { OptionsRefDto } from "./options-ref.dto";
import { Type } from "class-transformer";

/**
 * Product query options
 */
export class OptionsProductDto extends OptionsRefDto {
  /**
   * Select products by model
   */
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  readonly models?: boolean;
}
