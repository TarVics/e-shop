import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
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
import { ModelEntity } from '../entities';
import { ModelsService } from '../services';

/**
 * References / Models
 */
@Private(AuthRole.Admin)
@ApiTags('References / Models')
@Controller('refs/models')
export class ModelsController {
  constructor(private readonly refsService: ModelsService) {}

  /**
   * Read all Model items
   */
  @ApiOkResponse({ type: ModelEntity, isArray: true, description: 'Item list' })
  @Get()
  findAll(): Promise<ModelEntity[]> {
    return this.refsService.findAll();
  }

  /**
   * Create Model item
   * @param createRefDto
   */
  @ApiCreatedResponse({ type: ModelEntity, description: 'Item created' })
  @Post()
  create(@Body() createRefDto: CreateRefDto): Promise<ModelEntity> {
    return this.refsService.create(createRefDto);
  }

  /**
   * Read Model item by id
   * @param id
   */
  @ApiOkResponse({ type: ModelEntity, description: 'Item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ModelEntity> {
    const ref = await this.refsService.findOne(id);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Update Model item by id
   * @param id
   * @param updateRefDto
   */
  @ApiOkResponse({ type: ModelEntity, description: 'Result item By ID' })
  @ApiNotFoundResponse({ description: 'Item does not exists' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRefDto: UpdateRefDto,
  ): Promise<ModelEntity> {
    const ref = await this.refsService.update(id, updateRefDto);
    if (!ref) throw new NotFoundException();
    return ref;
  }

  /**
   * Remove Model item by id
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
