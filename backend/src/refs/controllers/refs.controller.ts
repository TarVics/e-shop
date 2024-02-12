import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RefsService } from '../services';
import { ViewAllRefsDto, OptionsRefDto } from '../dto';

/**
 * References
 */
@ApiTags('References')
@Controller('refs')
export class RefsController {
  constructor(private readonly refsService: RefsService) {}

  /**
   * All References
   * @param refOptionsDto
   */
  @ApiOkResponse({ type: ViewAllRefsDto, description: 'All references' })
  @Get()
  findAll(@Query() refOptionsDto: OptionsRefDto): Promise<ViewAllRefsDto> {
    return this.refsService.findAll(refOptionsDto.lang);
  }
}
