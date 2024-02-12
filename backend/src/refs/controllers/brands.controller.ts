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

import { CreateRefDto, UpdateRefDto } from '../dto';
import { BrandEntity } from '../entities';
import { BrandsService } from '../services';

/**
 * References / Brands
 */
@Private(AuthRole.Admin)
@ApiTags('References / Brands')
@Controller('refs/brands')
export class BrandsController {
  constructor(private readonly refsService: BrandsService) {}

  /**
   * Read all Brand items
   */
  @ApiOkResponse({ type: BrandEntity, isArray: true, description: 'Item list' })
  @Get()
  findAll(): Promise<BrandEntity[]> {
    return this.refsService.findAll();
  }

  /**
   * Create Brand item
   * @param createRefDto
   */
  @ApiCreatedResponse({ type: BrandEntity, description: 'Item created' })
  @Post()
  create(@Body() createRefDto: CreateRefDto): Promise<BrandEntity> {
    return this.refsService.create(createRefDto);
  }

  /**
   * Read Brand item by id
   * @param id
   */
  @ApiOkResponse({ type: BrandEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BrandEntity> {
    const ref = await this.refsService.findOne(id);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Update Brand item by id
   * @param id
   * @param updateRefDto
   */
  @ApiOkResponse({ type: BrandEntity, description: 'Result item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRefDto: UpdateRefDto,
  ): Promise<BrandEntity> {
    const ref = await this.refsService.update(id, updateRefDto);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Remove Brand item by id
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
