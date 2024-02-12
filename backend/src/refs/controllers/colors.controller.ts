import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
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

import { CreateColorDto, UpdateColorDto } from '../dto';
import { ColorEntity } from '../entities';
import { ColorsService } from '../services';

/**
 * References / Colors
 */
@Private(AuthRole.Admin)
@ApiTags('References / Colors')
@Controller('refs/colors')
export class ColorsController {
  constructor(private readonly refsService: ColorsService) {}

  /**
   * Read all Color items
   */
  @ApiOkResponse({ type: ColorEntity, isArray: true, description: 'Item list' })
  @Get()
  findAll(): Promise<ColorEntity[]> {
    return this.refsService.findAll();
  }

  /**
   * Create Color item
   * @param createColorRefDto
   */
  @ApiCreatedResponse({ type: ColorEntity, description: 'Item created' })
  @Post()
  create(@Body() createColorRefDto: CreateColorDto): Promise<ColorEntity> {
    return this.refsService.create(createColorRefDto);
  }

  /**
   * Read Color item by id
   * @param id
   */
  @ApiOkResponse({ type: ColorEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ColorEntity> {
    const ref = await this.refsService.findOne(id);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Update Color item by id
   * @param id
   * @param updateColorRefDto
   */
  @ApiOkResponse({ type: ColorEntity, description: 'Result item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateColorRefDto: UpdateColorDto,
  ): Promise<ColorEntity> {
    const ref = await this.refsService.update(id, updateColorRefDto);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Remove Color item by id
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
