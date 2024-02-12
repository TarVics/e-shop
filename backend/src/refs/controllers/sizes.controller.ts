import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

import { Private } from '../../auth/decorators';
import { AuthRole } from '../../auth/enums';

import { CreateRefDto, UpdateRefDto } from '../dto';
import { SizeEntity } from '../entities';
import { SizesService } from '../services';

/**
 * References / Sizes
 */
@Private(AuthRole.Admin)
@ApiTags('References / Sizes')
@Controller('refs/sizes')
export class SizesController {
  constructor(private readonly refsService: SizesService) {}

  /**
   * Read all Size items
   */
  @ApiOkResponse({ type: SizeEntity, isArray: true, description: 'Item list' })
  @Get()
  findAll(): Promise<SizeEntity[]> {
    return this.refsService.findAll();
  }

  /**
   * Create Size item
   * @param createRefDto
   */
  @ApiCreatedResponse({ type: SizeEntity, description: 'Item created' })
  @Post()
  create(@Body() createRefDto: CreateRefDto): Promise<SizeEntity> {
    return this.refsService.create(createRefDto);
  }

  /**
   * Read Size item by id
   * @param id
   */
  @ApiOkResponse({ type: SizeEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SizeEntity> {
    const ref = await this.refsService.findOne(id);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Update Size item by id
   * @param id
   * @param updateRefDto
   */
  @ApiOkResponse({ type: SizeEntity, description: 'Result item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRefDto: UpdateRefDto,
  ): Promise<SizeEntity> {
    const ref = await this.refsService.update(id, updateRefDto);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Remove Size item by id
   * @param id
   */
  @ApiNoContentResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const res: boolean = await this.refsService.remove(id);
    if (!res) throw new NotFoundException();
  }
}
